using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using Microsoft.AspNetCore.Mvc;
using MiPrimeraAppAngular.Clases;
using MiPrimeraAppAngular.Models;

namespace MiPrimeraAppAngular.Controllers
{
    public class TipoUsuarioController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/TipoUsuario/listarTipoUsuarios")]
        public List<TipoUsuarioCLS> listarTipoUsuarios()
        {
            List<TipoUsuarioCLS> listar = new List<TipoUsuarioCLS>();
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                listar = (from tipousuario in bd.TipoUsuario
                          where tipousuario.Bhabilitado == 1
                          select new TipoUsuarioCLS
                          {
                              idtipoUsuario = tipousuario.Iidtipousuario,
                              nombre = tipousuario.Nombre,
                              descripcion = tipousuario.Descripcion,
                              bhabilitado = (int)tipousuario.Bhabilitado
                          }).ToList();
                return listar;
            }
        }

        [HttpGet]
        [Route("api/TipoUsuario/listarPaginaTipoUsuario")]
        public List<PaginaCLS> listarPaginaTipoUsuario()
        {
            List<PaginaCLS> lista = new List<PaginaCLS>();

            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                lista = (from pagina in bd.Pagina
                         where pagina.Bhabilitado == 1
                         select new PaginaCLS
                         {
                             idpagina = pagina.Iidpagina,
                             mensaje = pagina.Mensaje
                         }).ToList();
            }

                return lista;
            
        }

        [HttpGet]
        [Route("api/TipoUsuario/listarPaginaRecuperar/{idtipo}")]
        public TipoUsuarioCLS listarPaginaRecuperar(int idtipo)
        {
            TipoUsuarioCLS tipousuario = new TipoUsuarioCLS();
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<PaginaCLS> listar = (from tipo in bd.TipoUsuario
                                          join paginatipo in bd.PaginaTipoUsuario
                                          on tipo.Iidtipousuario equals paginatipo.Iidtipousuario
                                          join pagina in bd.Pagina
                                          on paginatipo.Iidpagina equals pagina.Iidpagina
                                          where paginatipo.Iidtipousuario == idtipo
                                          && paginatipo.Bhabilitado == 1
                                          select new PaginaCLS
                                          {
                                              idpagina = pagina.Iidpagina
                                          }).ToList();

                TipoUsuario otipo = bd.TipoUsuario.Where(p => p.Iidtipousuario == idtipo).First();

                tipousuario.idtipoUsuario = otipo.Iidtipousuario;
                tipousuario.nombre = otipo.Nombre;
                tipousuario.descripcion = otipo.Descripcion;
                tipousuario.listaPagina = listar;

                return tipousuario;
            }
        }

        [HttpPost]
        [Route("api/TipoUsuario/guardarDatosTipoUsuario")]
        public int guardarDatosTipoUsuario([FromBody]TipoUsuarioCLS oTipoUsuarioCLS)
        {
            int rpta = 0;

            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    using (var transaccion =new TransactionScope())
                    {
                        //nuevo
                        if(oTipoUsuarioCLS.idtipoUsuario == 0)
                        {
                            TipoUsuario oTipoUsuario = new TipoUsuario();
                            oTipoUsuario.Nombre = oTipoUsuarioCLS.nombre;
                            oTipoUsuario.Descripcion = oTipoUsuarioCLS.descripcion;
                            oTipoUsuario.Bhabilitado = 1;
                            bd.TipoUsuario.Add(oTipoUsuario);

                            int idtipousuario = oTipoUsuario.Iidtipousuario;
                            string[] ids = oTipoUsuarioCLS.valores.Split("$");

                            for(int i =0; i< ids.Length; i++)
                            {
                                PaginaTipoUsuario oPaginaTipoUsuario = new PaginaTipoUsuario();
                                oPaginaTipoUsuario.Iidpagina = int.Parse(ids[i]);
                                oPaginaTipoUsuario.Iidtipousuario = idtipousuario;
                                oPaginaTipoUsuario.Bhabilitado = 1;
                                bd.PaginaTipoUsuario.Add(oPaginaTipoUsuario);
                            }
                            bd.SaveChanges();
                            transaccion.Complete();
                            rpta = 1;
                        }
                        else
                        {//recuperaos la informacion
                            TipoUsuario oTipoUsuario = bd.TipoUsuario.Where(p => p.Iidtipousuario == oTipoUsuarioCLS.idtipoUsuario).First();
                            oTipoUsuario.Nombre = oTipoUsuarioCLS.nombre;
                            oTipoUsuario.Descripcion = oTipoUsuarioCLS.descripcion;
                            string[] ids = oTipoUsuarioCLS.valores.Split("$");
                            //aca con el id tipo usuario (paginas asociadas lo vamos a deshabilitar)
                            List<PaginaTipoUsuario> lista = bd.PaginaTipoUsuario
                                .Where(p => p.Iidtipousuario == oTipoUsuarioCLS.idtipoUsuario).ToList();

                            foreach(PaginaTipoUsuario pag in lista)
                            {
                                pag.Bhabilitado = 0;
                            }
                            /*editar (si es que el id de pagina es nuevo lo insertamos) si es un
                             editar cambiamos el bhabilitado de 0 a 1)*/

                            int cantidad;
                            for (int i = 0; i < ids.Length; i++)
                            {
                                cantidad = lista.Where(p => p.Iidpagina == int.Parse(ids[i])).Count();
                                if(cantidad == 0)
                                {
                                    PaginaTipoUsuario oPaginaTipoUsuario = new PaginaTipoUsuario();
                                    oPaginaTipoUsuario.Iidpagina = int.Parse(ids[i]);
                                    oPaginaTipoUsuario.Iidtipousuario = oTipoUsuarioCLS.idtipoUsuario;
                                    oPaginaTipoUsuario.Bhabilitado = 1;
                                    bd.PaginaTipoUsuario.Add(oPaginaTipoUsuario);
                                }
                                else
                                {
                                    PaginaTipoUsuario op = lista.Where(p => p.Iidpagina == int.Parse(ids[i])).First();
                                    op.Bhabilitado = 1;
                                }
                            }
                            bd.SaveChanges();
                            transaccion.Complete();
                            rpta = 1;
                            
                        }
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
        [Route("api/TipoUsuario/eliminarTipoUsuario/{idtipousuario}")]
        public int eliminarTipoUsuario(int idtipousuario)
        {
            int rpta = 0;

            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    TipoUsuario oTipoUsuario = bd.TipoUsuario.Where(p => p.Iidtipousuario == idtipousuario).First();
                    oTipoUsuario.Bhabilitado = 0;
                    bd.SaveChanges();
                    rpta = 1;
                }
            }catch(Exception ex)
            {
                rpta = 0;
            }
            return rpta;
        }
    }
}
