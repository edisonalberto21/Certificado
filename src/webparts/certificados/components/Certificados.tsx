import * as React from 'react';
import { ICertificadosProps } from './ICertificadosProps';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import pnp, { sp, Item, ItemAddResult, ItemUpdateResult, Items, ConsoleListener } from "sp-pnp-js";
import { IListItem } from './IListItem';
import { ICertificadoState } from './ICertificadosState';


export default class Certificados extends React.Component<ICertificadosProps, ICertificadoState> {
  
  constructor(props: ICertificadosProps, state: ICertificadoState) {                     //Se define el constructor
    super(props);
    this.state = {                                                                   //Estado inicial, array items vacio
      items: [],
    };
    this.Certificado();     
                                                //Se ejecuta el método de consulta
   }

  public render(): React.ReactElement<ICertificadosProps> {
    return (
     <>
     <p>Login</p>
     </>
    );
  }
  private Certificado(){     
    pnp.sp.web.lists.getByTitle('Noticias')
      .items.select('Descripcion,Title,id,imagen,Categoria/Title,Categoria/Color&$expand=Categoria').top(4).orderBy('Created', false).filter("Destacado eq '1'").get()    //selecciona los items de la lista 
      .then((items: IListItem[]): void => {
        this.setState({
          items: items
        }); 
    }, (error: any): void => {        //Imprime si existe el error
      console.log(error);
       });
      
  }
}
