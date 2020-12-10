using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MiPrimeraAppAngular.Clases;
using MiPrimeraAppAngular.Models;

namespace MiPrimeraAppAngular.Controllers
{
    public class PersonaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        [Route("api/Persona/listarPersonas")]
        public IEnumerable<PersonaCLS> listarPersonas()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<PersonaCLS> listarPersona = (from persona in bd.Persona
                                                  where persona.Bhabilitado == 1
                                                  select new PersonaCLS
                                                  { idpersona = persona.Iidpersona,
                                                      nombreCompleto = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                                      telefono = persona.Telefono,
                                                      correo = persona.Correo,
                                                      fechaCadena = ((DateTime)persona.Fechanacimiento).ToString("yyyy-MM-dd")
                                                  }).ToList();
                return listarPersona;
            }
        }

        [HttpGet]
        [Route("api/Persona/filtrarPersonas/{nombreCompleto?}")]
        public IEnumerable<PersonaCLS> filtrarPersonas(string nombreCompleto = "")
        {
            List<PersonaCLS> listarPersona;
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
               if(nombreCompleto == "")
                {
                    listarPersona = (from persona in bd.Persona
                                     where persona.Bhabilitado == 1
                                     select new PersonaCLS
                                     {
                                         idpersona = persona.Iidpersona,
                                         nombreCompleto = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                         telefono = persona.Telefono,
                                         correo = persona.Correo,
                                         fechaCadena = ((DateTime)persona.Fechanacimiento).ToString("yyyy-MM-dd")
                                     }).ToList();
                }
                else
                {
                    listarPersona = (from persona in bd.Persona
                                     where persona.Bhabilitado == 1
                                     && (persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno).ToLower().Contains(nombreCompleto.ToLower())
                                     select new PersonaCLS
                                     {
                                         idpersona = persona.Iidpersona,
                                         nombreCompleto = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                         telefono = persona.Telefono,
                                         correo = persona.Correo,
                                         fechaCadena = ((DateTime)persona.Fechanacimiento).ToString("yyyy-MM-dd")
                                     }).ToList();
                }

                return listarPersona;
            }
        }
        [HttpPost]
        [Route("api/Persona/guardaPersona")]
        public int guardaPersona([FromBody] PersonaCLS oPersonaCLS)
        {
            int rpta = 0;
            try {

                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    Persona oPersona = new Persona();

                    if (oPersonaCLS.idpersona == 0)
                    {
                        oPersona.Iidpersona = oPersonaCLS.idpersona;
                        oPersona.Nombre = oPersonaCLS.nombre;
                        oPersona.Appaterno = oPersonaCLS.apPaterno;
                        oPersona.Apmaterno = oPersonaCLS.apMaterno;
                        oPersona.Telefono = oPersonaCLS.telefono;
                        oPersona.Correo = oPersonaCLS.correo;
                        oPersona.Fechanacimiento = oPersonaCLS.fechaNacimiento;
                        oPersona.Bhabilitado = 1;
                        oPersona.Btieneusuario = 0;

                        bd.Persona.Add(oPersona);
                        bd.SaveChanges();
                    }
                    else
                    {
                        //recuperar toda la fila
                        Persona oPersonaa = bd.Persona
                            .Where(p => p.Iidpersona == oPersonaCLS.idpersona).First();
                        oPersonaa.Iidpersona = oPersonaCLS.idpersona;
                        oPersonaa.Nombre = oPersonaCLS.nombre;
                        oPersonaa.Appaterno = oPersonaCLS.apPaterno;
                        oPersonaa.Apmaterno = oPersonaCLS.apMaterno;
                        oPersonaa.Telefono = oPersonaCLS.telefono;
                        oPersonaa.Correo = oPersonaCLS.correo;
                        oPersonaa.Fechanacimiento = oPersonaCLS.fechaNacimiento;
                        bd.SaveChanges();
                    }
                        rpta = 1;

                }

            }
            catch(Exception ex)
            {
                rpta = 0;
            }

            return rpta;
        }
        [HttpGet]
        [Route("api/Persona/validarCorreo/{id}/{correo}")]
        public int validarCorreo(int id, string correo)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    if (id == 0)
                    {
                        rpta = bd.Persona.Where(p => p.Correo.ToLower() == correo.ToLower()).Count();
                    }
                    else
                    {
                        rpta = bd.Persona.Where(p => p.Correo.ToLower() == correo.ToLower() 
                        && p.Iidpersona != id).Count();
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
        [Route("api/Persona/recuperarPersona/{idpersona}")]
        public PersonaCLS recuperarPersona(int idpersona)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                PersonaCLS oPersonaCLS = (from persona in bd.Persona
                                          where persona.Bhabilitado == 1
                                          && persona.Iidpersona == idpersona
                                          select new PersonaCLS
                                          {
                                              idpersona = persona.Iidpersona,
                                              nombre = persona.Nombre,
                                              apPaterno = persona.Appaterno,
                                              apMaterno = persona.Apmaterno,
                                              telefono = persona.Telefono,
                                              correo = persona.Correo,
                                              fechaCadena = persona.Fechanacimiento!= null ? ((DateTime)persona.Fechanacimiento).ToString("yyyy-MM-dd") : ""
                                          }).First();

                return oPersonaCLS;
            }
        }

        [HttpGet]
        [Route("api/Persona/eliminarPersona/{idpersona}")]
        public int eliminarPersona(int idpersona)
        {
            int rpta = 0;

            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    Persona oPersona = bd.Persona
                        .Where(p => p.Iidpersona == idpersona).First();
                    oPersona.Bhabilitado = 0;
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

        [HttpGet]
        [Route("api/Persona/listarPersonasCombo")]
        public IEnumerable<PersonaCLS> listarPersonasCombo()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                IEnumerable<PersonaCLS> listaPersona = (from persona in bd.Persona
                                                        where persona.Bhabilitado == 1
                                                        && persona.Btieneusuario == 0
                                                        select new PersonaCLS
                                                        {
                                                            idpersona = persona.Iidpersona,
                                                            nombreCompleto = persona.Nombre+" "+persona.Appaterno+" "+persona.Apmaterno
                                                        }).ToList();
                return listaPersona;
            }
        }

    }
}
