using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiPrimeraAppAngular.Clases
{
    public class TipoUsuarioCLS
    {
        public int idtipoUsuario { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public int bhabilitado { get; set; }

        //agregar
        public string valores { get; set; }

        //editar
        public List<PaginaCLS> listaPagina { get; set; }
    }
}
