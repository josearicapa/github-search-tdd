## TDD o Test-Driven Development (desarrollo dirigido por tests) 
### Proyecto meta in BetterMe - React/TDD/Jest

![Alt text](./public/tdd.png?raw=true "TDD")


Es una práctica de programación que consiste en:
1. Escribir primero las pruebas: Este ciclo se le conoce como Rojo y se busca que la prueba falle.
2. Después escribir el código fuente que pase la prueba satisfactoriamente: Este ciclo se le conoce como Verde.
3. Por último, refactorizar el código escrito buscando optimizarlo, a este ciclo se le conoce como Azul.

### Pros:
Con esta práctica se consigue entre otras cosas: 
1. Un código más robusto ya que se tendrían encuenta todas los escenarios necesarios para cubrir un requerimiento. 
2. TDD nos protege de escribir clases o métodos innecesarios, ya que su desarrollo es incrementar y cubriendo con los escenarios.
código necesario y funcional evitando escribir clases o métodos innecesarios que después pueden no ser usados.
2. Más mantenible. El ejercicio de buscar refactorizar constantemente garantiza que el código se refine constantemente. A esto podría 
sumarse la inclusión de Plugin en VSC que permitan revisar la complejidad ciclomatica y complejidad condicional de los métodos y clases
que se escriban.

### Contras:
1. Se afirma que ésta metodología ofrece una mayor rapidez en el desarrollo. Considero que esto depende de mucho del desarrollador. 
2. Se requiere cambiar la mentalidad ya que desde las universidades se enseña a evaluar/diseñar/construir/probar y este nuevo enfoque propuesta
cambia a evaluar/diseñar/probar/construir.
3. Los reprocesos por cambios en el alcance pueden ser contraproducente en el sentido que el cliente haya omitido escenarios por desconocimiento o 
se equivoque en su definición, lo que ocaciona que exista mucho reproceso y afecte la productividad.
4. Para disminuir el impacto que pueden haber por cambios, es necesario alinear a las diferentes partes interesadas, realizando la reunión de los 3 amigos 
donde se definen en conjunto las historias de usuario (UX,Product Owner, Developers) 

## Librerías usadas:
### React
Es una librería open source de JavaScript para desarrollar interfaces de usuario. Se caracteriza por la creación de componentes independientes y
reuzables dando lugar a crear poco a poco interfaces de usuario más complejas. 

### Jest
Jest es un Framework de pruebas de JavaScript con un enfoque en la simplicidad para probar aplicaciones de React.
### Testing library
La React Testing Library es una solución muy ligera para probar los componentes de React. Proporciona funciones de utilidad ligeras 
sobre react-dom y react-dom/test-utils, de manera que fomenta mejores prácticas de pruebas. 

Su principio fundamental es:

> Cuanto más se parezcan tus pruebas a la forma en que se utiliza tu software, más confianza te darán.

### Material UI 
MUI proporciona una biblioteca robusta, personalizable y accesible de componentes básicos y avanzados, lo que le permite crear su propio sistema de diseño y desarrollar aplicaciones React más rápido. Los componentes MUI funcionan de forma aislada. Son autosuficientes y solo inyectarán los estilos que necesitan mostrar. 