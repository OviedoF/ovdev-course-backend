## index.html
---
```html
     <header>
        <b><i>CatShop</i></b>

        <nav>
            <ul>
                <li><a href="/">Inicio</a></li>
                <li><a href="./contacto.html">Contacto</a></li>
                <li><a href="./carrito.html">Carrito</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <h1>CatShop</h1>
        <hr>

        <section>
            <h2>Sobre nosotros</h2>
            <img src="./imagenes/imagenfrente.jpg" alt="Frente de la tienda">

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad pariatur at qui earum architecto sequi non illo praesentium! Cumque voluptas quaerat, commodi modi placeat deserunt. Fuga et dolores illum, eius possimus delectus ipsum repudiandae in consequatur quisquam magni, obcaecati impedit nostrum harum debitis quod voluptate quas quos molestias omnis ab.</p>
        </section>
        
        <hr>

        <section>
            <h2>Horarios</h2>

            <table>
                <thead>
                    <tr>
                        <td>Lunes</td>
                        <td>Martes</td>
                        <td>Miércoles</td>
                        <td>Jueves</td>
                        <td>Viernes</td>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>8-12hs</td>
                        <td>8-15hs</td>
                        <td>13-17hs</td>
                        <td>12-17hs</td>
                        <td>12-17hs</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </main>

    <footer>
        <hr>

        <p>© Todos los derechos reservados por Pepito Inc. 2022</p>
    </footer>
```

## contacto.html
---
```html
    <header>
        <b><i>CatShop</i></b>

        <nav>
            <ul>
                <li><a href="./index.html">Inicio</a></li>
                <li><a href="./contacto.html">Contacto</a></li>
                <li><a href="./carrito.html">Carrito</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13643.108190956933!2d-61.4915844970215!3d-31.254594743293442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1662738232949!5m2!1ses-419!2sar" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

        <form>
            <label for="nombre">Ingrese su nombre</label>
            <input type="text" placeholder="nombre" id="nombre">
            <br>
            <br>

            <label for="ciudad">Ingrese su ciudad</label>
            <input type="text" placeholder="ciudad" id="ciudad">
            <br>
            <br>

            <label for="email">Ingrese su e-mail</label>
            <input type="email" placeholder="email" id="email">
            <br>
            <br>

            <input type="reset" value="Resetear formulario">
            <input type="submit" value="Enviar formulario">
        </form>
    </main>

    <footer>
        <hr>

        <p>© Todos los derechos reservados por Pepito Inc. 2022</p>
    </footer>
```

## carrito.html
---

```html

    <header>
        <b><i>CatShop</i></b>

        <nav>
            <ul>
                <li><a href="./index.html">Inicio</a></li>
                <li><a href="./contacto.html">Contacto</a></li>
                <li><a href="./carrito.html">Carrito</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <hr>
        <table>
            <thead>
                <tr>
                    <td>Producto</td>
                    <td>Cantidad</td>
                    <td>Precio</td>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>Collar gato</td>
                    <td>5</td>
                    <td>$20</td>
                </tr>

                <tr>
                    <td>Balanceado de pollo</td>
                    <td>2</td>
                    <td>$300</td>
                </tr>
            </tbody>

            <tfoot>
                <tr>
                    <td>Total</td>
                    <td>$700</td>
                </tr>
            </tfoot>
        </table>
    </main>

    <footer>
        <hr>

        <p>© Todos los derechos reservados por Pepito Inc. 2022</p>
    </footer>

```