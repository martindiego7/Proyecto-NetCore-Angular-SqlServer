using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MiPrimeraAppAngular.Clases;
using MiPrimeraAppAngular.Models;

namespace MiPrimeraAppAngular.Controllers
{
    public class CategoriaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        [Route("api/Categoria/listarCategorias")]
        public IEnumerable<CategoriaCLS> listarCategorias()
        {
            using (var bd = new BDRestauranteContext())
            {
                IEnumerable<CategoriaCLS> listaCategoria = (from categoria in bd.Categoria
                                                            where categoria.Bhabilitado == 1
                                                            select new CategoriaCLS
                                                            {idcategoria = categoria.Iidcategoria,
                                                            nombre = categoria.Nombre
                                                            }).ToList();
                return listaCategoria;
            }
        }
    }
}
