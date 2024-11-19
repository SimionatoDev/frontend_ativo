import { ParametroPadrao_Cab01 } from "src/app/parametros/parametro-padrao_cab01";

export function AtualizaParametroParametroPadraoCab01(par : ParametroPadrao_Cab01 , config : JSON):ParametroPadrao_Cab01 {

  try {


    let key:number = 0;

    key = parseInt(Object(config).codigo, 10);

    if (isNaN(key)) {
      par.id = 0;
    } else {
      par.id = key;
    }

    if (Object(config).orderby?.trim() !== '') {
      par.orderby = Object(config).orderby;
    }


    if (Object(config).apelido?.trim() !== '') {
      par.apelido = Object(config).apelido;
    }

    if (Object(config).descricao?.trim() !== '') {
      par.descricao = Object(config).descricao;
    }


    return par;

  } catch(error){
     throw error
  }

}
