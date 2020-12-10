using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MiPrimeraAppAngular.Clases;
using MiPrimeraAppAngular.Models;

namespace MiPrimeraAppAngular.Controllers
{
    public class ProductoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/Producto/listarProductos")]
        public IEnumerable<ProductoCLS> listarProductos()
        {
            using(BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<ProductoCLS> lista = (from producto in bd.Producto
                                           join categoria in bd.Categoria
                                           on producto.Iidcategoria equals
                                           categoria.Iidcategoria
                                           where producto.Bhabilitado == 1
                                           select new ProductoCLS
                                           {idproducto = producto.Iidproducto,
                                            nombre = producto.Nombre,
                                            precio = (decimal)producto.Precio,
                                            stock = (int)producto.Stock,
                                            nombreCategoria = categoria.Nombre
                                           }).ToList();
                return lista;
            }
        }
        [HttpGet]
        [Route("api/Producto/obtenerProductoPorId/{idproducto}")]
        public ProductoCLS obtenerProductoPorId(int idproducto)
        {
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    ProductoCLS oProductoCLS = (from producto in bd.Producto
                                                where producto.Bhabilitado == 1
                                                && producto.Iidproducto == idproducto
                                                select new ProductoCLS
                                                {
                                                    idproducto = producto.Iidproducto,
                                                    nombre = producto.Nombre,
                                                    idcategoria = (int)producto.Iidcategoria,
                                                    idmarca = (int)producto.Iidmarca,
                                                    precio = (decimal)producto.Precio,
                                                    stock = (int)producto.Stock,
                                                    foto = producto.Foto
                                                }).First();
                    return oProductoCLS;
                }
            }
            catch(Exception ex)
            {
                return null;
            }
        }

        [HttpGet]
        [Route("api/Producto/filtrarProductosPorNombre/{nombre}")]
        public IEnumerable<ProductoCLS> filtrarProductosPorNombre(string nombre)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<ProductoCLS> lista = (from producto in bd.Producto
                                           join categoria in bd.Categoria
                                           on producto.Iidcategoria equals
                                           categoria.Iidcategoria
                                           where producto.Bhabilitado == 1
                                           && producto.Nombre.ToLower().Contains(nombre.ToLower())
                                           select new ProductoCLS
                                           {
                                               idproducto = producto.Iidproducto,
                                               nombre = producto.Nombre,
                                               precio = (decimal)producto.Precio,
                                               stock = (int)producto.Precio,
                                               nombreCategoria = categoria.Nombre
                                           }).ToList();
                return lista;
            }
        }

        [HttpGet]
        [Route("api/Producto/filtrarProductosPorCategoria/{idcategoria}")]
        public IEnumerable<ProductoCLS> filtrarProductosPorCategoria(int idcategoria)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<ProductoCLS> lista = (from producto in bd.Producto
                                           join categoria in bd.Categoria
                                           on producto.Iidcategoria equals
                                           categoria.Iidcategoria
                                           where producto.Bhabilitado == 1
                                           && producto.Iidcategoria == idcategoria
                                           select new ProductoCLS
                                           {
                                               idproducto = producto.Iidproducto,
                                               nombre = producto.Nombre,
                                               precio = (decimal)producto.Precio,
                                               stock = (int)producto.Precio,
                                               nombreCategoria = categoria.Nombre
                                           }).ToList();
                return lista;
            }
        }
        [HttpGet]
        [Route("api/Producto/listarMarcas")]
        public IEnumerable<MarcaCLS> listarMarcas()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<MarcaCLS> listaMarca = (from marca in bd.Marca
                                             where marca.Bhabilitado == 1
                                             select new MarcaCLS
                                             {
                                                 idmarca = marca.Iidmarca,
                                                 nombre = marca.Nombre
                                             }).ToList();

                return listaMarca;
            }
        }
        [HttpPost]
        [Route("api/Producto/registrarProducto")]
        public int registrarProducto([FromBody] ProductoCLS producto)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    if(producto.idproducto == 0)
                    {
                        Producto pro = new Producto();
                        pro.Nombre = producto.nombre;
                        pro.Precio = producto.precio;
                        pro.Stock = producto.stock;
                        pro.Iidmarca = producto.idmarca;
                        pro.Iidcategoria = producto.idcategoria;
                        pro.Bhabilitado = 1;
                        pro.Foto = producto.foto;
                        bd.Producto.Add(pro);
                        bd.SaveChanges();
                        rpta = 1;
                    }
                    else
                    {
                        Producto pro = bd.Producto.Where(p => p.Iidproducto == producto.idproducto).First();
                        pro.Nombre = producto.nombre;
                        pro.Precio = producto.precio;
                        pro.Stock = producto.stock;
                        pro.Iidmarca = producto.idmarca;
                        pro.Iidcategoria = producto.idcategoria;
                        pro.Foto = producto.foto;
                        bd.SaveChanges();
                        rpta = 1;
                    }
                }
            }
            catch(Exception ex)
            {
                rpta = 0;
            }
            return rpta;
        }
        [HttpGet]
        [Route("api/Producto/eliminarProducto/{idproducto}")]
        public int eliminarProducto(int idproducto)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    Producto producto = bd.Producto.Where(p => p.Iidproducto == idproducto).First();
                    producto.Bhabilitado = 0;
                    bd.SaveChanges();
                    rpta = 1;
                }
                
            }
            catch(Exception ex)
            {
                rpta = 0;
            }
            return rpta;
        }
    }
}
