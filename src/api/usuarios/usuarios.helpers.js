export const getUsuarioQuery = "SELECT nombres, apellidos, direccion, telefono_emergencias FROM usuario WHERE id_usuario = $1";

export const getMedicacionesQuery = "SELECT titulo FROM medicacion WHERE id_usuario = $1 order by titulo asc limit 3";

export const getAlergiasQuery = "SELECT titulo FROM alergia WHERE id_usuario = $1 order by titulo asc limit 3";

export const getPadecimientosQuery = "SELECT titulo FROM padecimiento WHERE id_usuario = $1 order by titulo asc limit 3";

export const getCirugiasQuery = "SELECT titulo FROM cirugia WHERE id_usuario = $1 order by titulo asc limit 3";