import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ProductoService } from '../../services/Producto.Service'
import { CategoriaService } from '../../services/categoria.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'producto-form-mantenimiento',
  templateUrl: './producto-form-mantenimiento.component.html',
  styleUrls: ['./producto-form-mantenimiento.component.css']
})
export class ProductoFormMantenimientoComponent implements OnInit {

  producto: FormGroup;
  categorias: any;
  marcas: any;
  titulo: string;
  param: string;
  foto: any;
  constructor(private productoService: ProductoService, private categoriaService: CategoriaService,
    private activatedRoute: ActivatedRoute, private router: Router) {
    this.producto = new FormGroup({
      'idproducto': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(100)]),
      'precio': new FormControl("0", [Validators.required]),
      'stock': new FormControl("0", [Validators.required, this.noPuntoDecimal]),
      'idmarca': new FormControl("", [Validators.required]),
      'idcategoria': new FormControl("", [Validators.required]),
      'foto': new FormControl("")
    });

    this.activatedRoute.params.subscribe(params => {
      this.param = params["id"];
    });

    if (this.param == "nuevo") {
      this.titulo = "Agregando un nuevo Producto"
    } else {
      this.titulo = "Editanto un Producto"
    }
  }

  ngOnInit() {
    this.productoService.listarMarcas().subscribe(data => this.marcas = data);
    this.categoriaService.getCategoria().subscribe(data => this.categorias = data);
    if (this.param != "nuevo") {
      this.productoService.obtenerProductoPorId(this.param).subscribe(data => {
        this.producto.controls["idproducto"].setValue(data.idproducto);
        this.producto.controls["nombre"].setValue(data.nombre);
        this.producto.controls["precio"].setValue(data.precio);
        this.producto.controls["stock"].setValue(data.stock);
        this.producto.controls["idmarca"].setValue(data.idmarca);
        this.producto.controls["idcategoria"].setValue(data.idcategoria);
        if (data.foto == "") {
          this.foto = "";
        } else {
          this.foto = data.foto;
        }
        
      });
    }
  }

  public guardarDatos() {
    if (this.producto.valid == true) {

      this.producto.controls["foto"].setValue(this.foto);

      this.productoService.registrarProducto(this.producto.value)
        .subscribe(p => {

          this.router.navigate(["./mantenimientoProducto"]);

        });

    }
  }

 
  public noPuntoDecimal(control: FormControl) {
    if (control.value != null && control.value != "") {
      if ((<string>control.value.toString()).indexOf(".") > -1) {
        return { puntoDecimal: true };
      }
      return null;
    }
  }

  public subirFoto() {
    var file = (<HTMLInputElement>document.getElementById("fupFoto")).files[0]

    var myReader: FileReader = new FileReader();

    //genero un arrau function
    myReader.onloadend = () => {

      this.foto = myReader.result;
    }

    myReader.readAsDataURL(file);
  }
  
}
