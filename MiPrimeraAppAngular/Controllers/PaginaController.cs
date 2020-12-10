using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MiPrimeraAppAngular.Clases;
using MiPrimeraAppAngular.Models;

namespace MiPrimeraAppAngular.Controllers
{
    public class PaginaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        [Route("api/Pagina/listarPaginasDB")]
        public List<PaginaCLS> listarPaginasDB()
        {
            List<PaginaCLS> lista = new List<PaginaCLS>();

            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                lista = (from pagina in bd.Pagina
                         where pagina.Bhabilitado == 1
                         select new PaginaCLS
                         {
                             idpagina = pagina.Iidpagina,
                             mensaje = pagina.Mensaje,
                             accion = pagina.Accion
                         }).ToList();

                return lista;
            }
        }
        [HttpPost]
        [Route("api/Pagina/guardarPagina")]
        public int guardarPagina([FromBody] PaginaCLS oPaginaCLS)
        {
            int rpta = 0;

            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    if (oPaginaCLS.idpagina == 0)
                    {
                        Pagina pagina = new Pagina();
                        pagina.Iidpagina = oPaginaCLS.idpagina;
                        pagina.Mensaje = oPaginaCLS.mensaje;
                        pagina.Accion = oPaginaCLS.accion;
                        pagina.Bvisible = oPaginaCLS.bVisible;
                        pagina.Bhabilitado = 1;
                        bd.Pagina.Add(pagina);
                        bd.SaveChanges();
                        rpta = 1;
                    }
                    else
                    {
                        Pagina pagina = bd.Pagina.Where(p => p.Iidpagina == oPaginaCLS.idpagina).First();
                        pagina.Mensaje = oPaginaCLS.mensaje;
                        pagina.Accion = oPaginaCLS.accion;
                        pagina.Bvisible = oPaginaCLS.bVisible;
                        bd.SaveChanges();
                        rpta = 1;
                    }
                }
            }catch(Exception ex)
            {
                rpta = 0;
            }

            return rpta;
        }

        [HttpGet]
        [Route("api/Pagina/recuperarPagina/{idpagina}")]
        public PaginaCLS recuperarPagina(int idpagina)
        {
            PaginaCLS oPaginaCLS = new PaginaCLS();
            try
            {
                using(BDRestauranteContext bd = new BDRestauranteContext())
                {
                    oPaginaCLS = (from pagina in bd.Pagina
                                  where pagina.Bhabilitado == 1
                                  && pagina.Iidpagina == idpagina
                                  select new PaginaCLS
                                  {
                                      idpagina = pagina.Iidpagina,
                                      mensaje = pagina.Mensaje,
                                      accion = pagina.Accion,
                                      bVisible = (int)pagina.Bvisible
                                  }).First();
                }
            }
            catch(Exception ex)
            {
                oPaginaCLS.accion = null;
            }

            return oPaginaCLS;
        }
        [HttpGet]
        [Route("api/Pagina/eliminarPagina/{idpagina}")]
        public int eliminarPagina(int idpagina)
        {
            int rpta = 0;

            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    Pagina pagina = new Pagina();
                    pagina = bd.Pagina.Where(p => p.Iidpagina == idpagina).First();
                    pagina.Bhabilitado = 0;
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
