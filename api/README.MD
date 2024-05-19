Definiendo FLOW:


[Flow 1]
Input File -> Uploading... -> Store   -> Transform to HTML
Show HTML  <- Response     <- GetHTML <-

[Flow 2]
Add Events by  -> Clicking  -> Show Aside Right  -> Add Events Aside  -> Edit HTML
each HTML                                           Inputs                  |
               <-------------- Hide Aside Right  <- Save changes      <-----|


Asides:
- La construccion de los Asides se hara con el Patron Constructor, que es un patron creacional


Objetos:
- Supplies: El HTML proporcionado
- Toolbar (AsideLeft): Barra de Herramientas
- PropertyBar (AsideRight): Barra de Propiedades
- Menu: Primary Menu
- AuxMenu: Secondary Menu (Auxiliar)
- AppState: Estado de la aplicacion


Como puedo construir el Toolbar y el PropertyBar?
- Con el Patron Builder

Como puedo construir los Supplies?
- El ya viene construido, solo necesita una capa logica javascript para ser modificado
- Para crear Supplies, usaremos el patron Singleton, ya que este objeto sera unico y modificable

Definiendo interactividad:
Toolbar     -> Edit -> Supplies
PropertyBar -> Edit -> Supplies

- Usar el patron de estados, para alterar el estado interno del Supplies y asi lograr modificarlo