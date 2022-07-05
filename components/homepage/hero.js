import Image from "next/image";

import classes from "./hero.module.css"

function Hero() {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image src="/images/site/ivofaria.jpg" alt="An image showing Ivo Faria" width={300} height={300}/>
            </div>
            <h1>Hi, I'm Ivo Faria</h1>
            <p>I blog about web design and development - especially ux-ui and frontend production.</p>
        </section>
    );
}

export default Hero;