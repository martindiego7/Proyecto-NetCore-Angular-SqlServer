using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MiPrimeraAppAngular.Clases;
using MiPrimeraAppAngular.Models;

namespace MiPrimeraAppAngular.Controllers
{
    public class UsuarioController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/Usuario/listartipoUsuario")]
        public IEnumerable<TipoUsuarioCLS> listartipoUsuario()
        {
            using(BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<TipoUsuarioCLS> listaTipoUsuario = (from tipoUsuario in bd.TipoUsuario
                                                         where tipoUsuario.Bhabilitado == 1
                                                         select new TipoUsuarioCLS
                                                         {idtipoUsuario = tipoUsuario.Iidtipousuario,
                                                         nombre = tipoUsuario.Nombre
                                                         }).ToList();
                return listaTipoUsuario;
            }
        }

        [HttpGet]
        [Route("api/Usuario/listarUsuarios")]
        public IEnumerable<UsuarioCLS> listarUsuarios()
        {
            using(BDRestauranteContext db = new BDRestauranteContext())
            {
                List<UsuarioCLS> listaUsuario = (from usuario in db.Usuario
                                                 join persona in db.Persona
                                                 on usuario.Iidpersona equals
                                                 persona.Iidpersona
                                                 join tipoUsuario in db.TipoUsuario
                                                 on usuario.Iidtipousuario equals
                                                 tipoUsuario.Iidtipousuario
                                                 where usuario.Bhabilitado == 1
                                                 select new UsuarioCLS
                                                 {idusuario = usuario.Iidusuario,
                                                  nombreUsuario = usuario.Nombreusuario,
                                                  nombrePersona = persona.Nombre+" "+persona.Appaterno+" "+persona.Apmaterno,
                                                  nombreTipoUsuario = tipoUsuario.Nombre,
                                                 }).ToList();

                return listaUsuario;
            }
        }

        [HttpGet]
        [Route("api/Usuario/filtrarUsuarioPorTipo/{idTipo?}")]
        public IEnumerable<UsuarioCLS> filtrarUsuarioPorTipo(int idTipo = 0)
        {
            using (BDRestauranteContext db = new BDRestauranteContext())
            {
                List<UsuarioCLS> listaUsuarioPorTipo = (from usuario in db.Usuario
                                                 join persona in db.Persona
                                                 on usuario.Iidpersona equals
                                                 persona.Iidpersona
                                                 join tipoUsuario in db.TipoUsuario
                                                 on usuario.Iidtipousuario equals
                                                 tipoUsuario.Iidtipousuario
                                                 where usuario.Bhabilitado == 1
                                                 && usuario.Iidtipousuario == idTipo
                                                 select new UsuarioCLS
                                                 {
                                                     idusuario = usuario.Iidusuario,
                                                     nombrePersona = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                                     nombreTipoUsuario = tipoUsuario.Nombre,
                                                 }).ToList();

                return listaUsuarioPorTipo;
            }
        }

        [HttpGet]
        [Route("api/Usuario/validarUsuario/{idusuario}/{nombre}")]
        public int validarUsuario(int idusuario, string nombre)
        {
            int rpta = 0;

            try
            {
                using (BDRestauranteContext db = new BDRestauranteContext())
                {
                    if(idusuario == 0)
                    {
                        rpta = db.Usuario
                            .Where(p => p.Nombreusuario.ToLower() == nombre.ToLower())
                            .Count();
                    }
                    else
                    {
                        rpta = db.Usuario
                            .Where(p => p.Nombreusuario.ToLower() == nombre.ToLower()
                            && p.Iidusuario != idusuario).Count();
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
        [Route("api/Usuario/recuperarUsuario/{idusuario}")]
        public UsuarioCLS recuperarUsuario(int idusuario)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                UsuarioCLS oUsuarioCLS = new UsuarioCLS();
                Usuario usuario = bd.Usuario.Where(p => p.Iidusuario == idusuario).First();
                oUsuarioCLS.idusuario = usuario.Iidusuario;
                oUsuarioCLS.nombreUsuario = usuario.Nombreusuario;
                oUsuarioCLS.idTipoUsuario = (int)usuario.Iidtipousuario;

                return oUsuarioCLS;
            }
            
        } 
        [HttpPost]
        [Route("api/Usuario/guardarDatos")]
        public int guardarDatos([FromBody] UsuarioCLS oUsuarioCLS)
        {
            int rpta = 0;

            try
            {
                using (BDRestauranteContext bd=new BDRestauranteContext())
                {
                    using (var transaccion = new TransactionScope())
                    {
                        if(oUsuarioCLS.idusuario == 0)
                        {
                            //agregar
                            Usuario oUsuario = new Usuario();
                            oUsuario.Nombreusuario = oUsuarioCLS.nombreUsuario;
                            //cifrar contraseña
                            SHA256Managed sha = new SHA256Managed();
                            string clave = oUsuarioCLS.contra;
                            byte[] dataNoCifrada = Encoding.Default.GetBytes(clave);
                            byte[] dataCifrada = sha.ComputeHash(dataNoCifrada);
                            string claveCifrada = BitConverter.ToString(dataCifrada).Replace("-","");
                            // termino del cifrado
                            oUsuario.Contra = claveCifrada;
                            oUsuario.Iidpersona = oUsuarioCLS.idpersona;
                            oUsuario.Iidtipousuario = oUsuarioCLS.idTipoUsuario;
                            oUsuario.Bhabilitado = 1;
                            bd.Usuario.Add(oUsuario);
                            

                            //modificar persona

                            Persona oPersona = bd.Persona.Where(p => p.Iidpersona == oUsuarioCLS.idpersona).First();
                            oPersona.Btieneusuario = 1;
                            bd.SaveChanges();
                            transaccion.Complete();

                        }
                        else
                        {
                            //editar
                            Usuario oUsuario = bd.Usuario.Where(p => p.Iidusuario == oUsuarioCLS.idusuario).First();
                            oUsuario.Nombreusuario = oUsuarioCLS.nombreUsuario;
                            oUsuario.Iidtipousuario = oUsuarioCLS.idTipoUsuario;
                            bd.SaveChanges();
                            transaccion.Complete();
                        }

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
        [Route("api/Usuario/eliminarUsuario/{idusuario}")]
        public int eliminarUsuario(int idusuario)
        {
            int rpta = 0;

            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    Usuario oUsuario = bd.Usuario.Where(p => p.Iidusuario == idusuario && 
                    p.Bhabilitado == 1).First();
                    oUsuario.Bhabilitado = 0;
                    bd.SaveChanges();
                    rpta = 1;
                }
            }catch(Exception ex)
            {
                rpta = 0;
            }

            return rpta;
        }
        [HttpPost]
        [Route("api/Usuario/login")]
        public UsuarioCLS login([FromBody] UsuarioCLS oUsuarioCLS)
        {
            int rpta = 0;
            UsuarioCLS oUsuario = new UsuarioCLS();
            using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    
                    SHA256Managed sha = new SHA256Managed();
                    byte[] dataNoCifrada = Encoding.Default.GetBytes(oUsuarioCLS.contra);
                    byte[] dataCifrada = sha.ComputeHash(dataNoCifrada);
                    string claveCifrada = BitConverter.ToString(dataCifrada).Replace("-", "");
                    rpta = bd.Usuario.Where(p => p.Nombreusuario.ToLower() == oUsuarioCLS.nombreUsuario.ToLower()
                    && p.Contra == claveCifrada).Count();
                    if(rpta == 1)
                    {
                        Usuario usuarioRecuperar = bd.Usuario.Where(p => p.Nombreusuario.ToUpper() == oUsuarioCLS.nombreUsuario.ToUpper()
                        && p.Contra == claveCifrada).First();
                        //se crea la sesion
                        HttpContext.Session.SetString("usuario", usuarioRecuperar.Iidusuario.ToString());
                        HttpContext.Session.SetString("tipousuario", usuarioRecuperar.Iidtipousuario.ToString());
                        oUsuario.idusuario = usuarioRecuperar.Iidusuario;
                        oUsuario.nombreUsuario = usuarioRecuperar.Nombreusuario;
                    }
                    else
                    {
                        oUsuario.idusuario = 0;
                        oUsuario.nombreUsuario = "";  
                    }
                }

            return oUsuario;

        }

        [HttpGet]
        [Route("api/Usuario/obtenerVariableSession")]
        public SeguridadCLS obtenerVariableSession()
        {
            SeguridadCLS oSeguridadCLS = new SeguridadCLS();

            string variableSession = HttpContext.Session.GetString("usuario");

            if (variableSession == null)
            {
                oSeguridadCLS.valor = "";
            }
            else
            {
                oSeguridadCLS.valor = variableSession;
                List<PaginaCLS> listaPagina = new List<PaginaCLS>();
                int idusuario = int.Parse(HttpContext.Session.GetString("usuario"));
                int tipousuario = int.Parse(HttpContext.Session.GetString("tipousuario"));

                using(BDRestauranteContext bd = new BDRestauranteContext())
                {
                    listaPagina = (from usuario in bd.Usuario
                                   join tipoUsuario in bd.TipoUsuario
                                   on usuario.Iidtipousuario equals tipoUsuario.Iidtipousuario
                                   join paginatipo in bd.PaginaTipoUsuario
                                   on tipoUsuario.Iidtipousuario equals paginatipo.Iidtipousuario
                                   join pagina in bd.Pagina
                                   on paginatipo.Iidpagina equals pagina.Iidpagina
                                   where usuario.Iidusuario == idusuario
                                   && usuario.Iidtipousuario == tipousuario
                                   && paginatipo.Bhabilitado == 1
                                   select new PaginaCLS
                                   {
                                       accion = pagina.Accion.Substring(1)
                                   }).ToList();

                    oSeguridadCLS.lista = listaPagina;
                }

            }

            return oSeguridadCLS;
        }

        [HttpGet]
        [Route("api/Usuario/cerrarSession")]
        public SeguridadCLS cerrarSession()
        {
            SeguridadCLS oSeguridadCLS = new SeguridadCLS();

            try
            {
                HttpContext.Session.Remove("usuario");
                HttpContext.Session.Remove("tipousuario");
                oSeguridadCLS.valor = "OK";
            }
            catch(Exception ex)
            {
                oSeguridadCLS.valor = "";
            }

            return oSeguridadCLS;
        }

        [HttpGet]
        [Route("api/Usuario/listarPagina")]
        public List<PaginaCLS> listarPagina()
        {
            List<PaginaCLS> listarPagina = new List<PaginaCLS>();
            int idTipoUsuario = int.Parse(HttpContext.Session.GetString("tipousuario"));
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                listarPagina = (from paginaTipo in bd.PaginaTipoUsuario
                                join pagina in bd.Pagina
                                on paginaTipo.Iidpagina equals pagina.Iidpagina
                                where paginaTipo.Bhabilitado == 1
                                && paginaTipo.Iidtipousuario == idTipoUsuario
                                && pagina.Bvisible == 1
                                select new PaginaCLS
                                {
                                    idpagina = pagina.Iidpagina,
                                    accion = pagina.Accion,
                                    mensaje = pagina.Mensaje,
                                    bHabilitado = (int)pagina.Bhabilitado
                                }).ToList();

                return listarPagina;
            }
        }


    }
}
