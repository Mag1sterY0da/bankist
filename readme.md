<h1 align="center">
  <br>
  Bankist
  <br>
</h1>

<h3 align="center">Pseudo baking with presentation page </h4>

### Contents:
- [Key Features](#key-features)
- [About The Project](#about-the-project)
  - [Configuration](#configuration)
  - [Built with](#built-with)
  - [Flowchart](#flowchart)
- [Demo](#demo)
- [Download](#download)
- [Contact](#contact)

## Key Features

* Nice design
* Optimized for Mobile
    * Lazy loading
    * Responsiveness
* Implemented basic webpage components and effects
    * Tabbed component
    * Slider component
    * Smooth scrolling
    * Sticky navigation
    * Revealing elements on scrolling

## About The Project

The project was divided into 2 parts: **App** and **Presentation page**. In the app part I used a lot of basic methods of
Arrays, Date and Intl. In the second part I implemented different basic webpage components with wonderful effects and
worked with DOM and Events. This project was built during
my [JS course](https://www.udemy.com/course/the-complete-javascript-course/).
I wrote JS code, modified CSS code for responsive with given markup and linked 2 projects.

### Configuration

All account's data is saved in objects like that:

```js
{
    owner: 'Jessica Davis',
    movements: [...],
    interestRate: 1.5,
    pin: 2222,
    currency: 'USD',
    locale: 'en-US'
  }
```

Username is created using ```createUsernames()``` function. Username from example above will be **jd**. **Use it when will be logging in**.

### Built with

[![HTML][html]][html-url]
[![CSS][css]][css-url]
[![JS][js]][js-url]

### Flowchart

![flowchart]

## Demo

Pagination between **App** and **Presentation page**:
![nav]

The site hosted on Netlify

[Demo](https://bankist-mag.netlify.app/)

## Download

To clone and run this application, you'll need [Git](https://git-scm.com) installed on your computer. From your command
line:

```bash
# Clone this repository
$ git clone https://github.com/Mag1sterY0da/bankist.git
```

## Contact

Oleksandr - [@Mag1sterY0da](https://twitter.com/Mag1sterY0da) - oborodavchenko@gmail.com

### Checkout my another projects

* Other project links will be added later

<!-- MARKDOWN LINKS & IMAGES -->

[nav]: navigation.gif

[flowchart]: bankist-flowchart.png

[html]: https://img.shields.io/badge/html-f16524?style=for-the-badge&logo=html5&logoColor=white

[html-url]: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference

[css]: https://img.shields.io/badge/css-2965f1?style=for-the-badge&logo=css3&logoColor=white

[css-url]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference

[js]: https://img.shields.io/badge/js-ffda3e?style=for-the-badge&logo=javascript&logoColor=black

[js-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference