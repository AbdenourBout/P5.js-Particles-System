let particleInstances = [];
let nearbyParticles = [];
let index;
let link;
let particleColor;
let linkColor;
let op = 128;

function preload() {

    particleColor = color(109, 179, 63);
    linkColor = color(0);
    for (let i = 0; i < 100; i++) {

        particleInstances.push(new Particle());

    }
    link = new Link(50, 50, 400, 400);

}



function setup() {
    createCanvas(windowWidth, windowHeight);
}


function draw() {
    background('#1B1F23');

    link.show();
    link.popStyle();

    for (const instance of particleInstances) {

        instance.move();
        if (abs(instance.x - mouseX) < 100 && abs(instance.y - mouseY) < 100) {



            if (!nearbyParticles.includes(instance)) {
                nearbyParticles.push(instance);
            }
        } else {
            if (nearbyParticles.includes(instance)) {
                index = nearbyParticles.indexOf(instance);
                nearbyParticles.splice(index, 1);
            }
        }

        instance.show();
        instance.popStyle();

    }
    for (let i = 0; i < nearbyParticles.length - 1; i++) {
        for (let j = i + 1; j < nearbyParticles.length; j++) {
            elm2 = nearbyParticles[j];
            elm = nearbyParticles[i];
            // stroke('rgba(0, 179, 63, '+alpha(elm.x,elm2.x,elm.y,elm2.y)+')');
            let mylink = new Link(elm.x, elm.y, elm2.x, elm2.y);
            mylink.show();
            //line(elm.x, elm.y, elm2.x, elm2.y);
        }
    }

}

class Link {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        // this.alpha = this.calculateAlpha();
    }
    show() {

        this.pushLinkStyle()
        line(this.x1, this.y1, this.x2, this.y2);
        //op += 0.001;
    }
    /*calculateAlpha() {

        console.log("distance" + dist((this.x1 + this.x2) / 2, mouseX, (this.y1 + this.y2) / 2, mouseY));
        console.log("map" + map(dist((this.x1 + this.x2) / 2, mouseX, (this.y1 + this.y2) / 2, mouseY), 0, 100, 0, 1));
        return map(dist((this.x1 + this.x2) / 2, mouseX, (this.y1 + this.y2) / 2, mouseY), 0, 100, 1, 0, true);
    }*/
    pushLinkStyle() {
        push();
        noStroke();
        stroke(linkColor);
    }
    popStyle() {
        pop();
    }
}

class Particle {
    constructor() {
        this.x = random(10, windowWidth);
        this.y = random(10, windowHeight);
        this.r = 10;


        /*this.xSpeed=0;
        this.ySpeed=0;*/
        this.xSpeed = random(-1, 1);
        this.ySpeed = random(-1, 1);
    }

    show() {
        //noStroke();
        this.pushParticleStyle();
        ellipse(this.x, this.y, this.r);
    }
    move() {
        if (this.x > windowWidth || this.x < 0)
            this.xSpeed = -this.xSpeed;

        if (this.y > windowWidth || this.y < 0)
            this.ySpeed = -this.ySpeed;

        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }
    pushParticleStyle() {
        push();
        noStroke();
        fill(particleColor);
    }
    popStyle() {
        pop();
    }
}