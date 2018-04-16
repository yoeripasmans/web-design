# Responsive gallery

![Preview](readme-img/preview.png)

Voor deze opdracht heb ik een use case uitgewerkt waarin de gebruiker door een overzicht van foto's heen kan scrollen, info lezen, groot kunnen bekijken en als slideshow afspelen. Hiervoor heb ik een prototype uitgewerkt in HTMl, CSS en Javascript. Tijdens dit proces heb ik door te testen een beter eindproduct kunnen realiseren.  Daarbij heb ik rekening gehouden met verschillende design principles van de Principles of User Interface Design. [bron](http://bokardo.com/principles-of-user-interface-design/)

[Link naar demo](https://yoeripasmans.github.io/web-design/opdracht1/src/)

## Schetsen

![thumb1](readme-img/schetsen.jpg)

## Aanpassingen na feedback

In de `versie 1.0` van mijn gallery had ik nog niet de volledige functionaliteit uitgewerkt. Ik heb dus vooral getest of er dingen onduidelijk waren of misde. Daaruit bleek vooral dat als de gebruiker over de afbeeldingen heen hoverde er te weinig informatie over de afbeelding te zien was. Dit heb ik dus veranderd.

Van `versie 1.0`:

![thumb1](readme-img/thumb1.png)

Naar `versie 2.0`:

![thumb1](readme-img/thumb2.png)

Ook was de header erg leeg en bevatte nog niet veel functionaliteit. Daarnaast was de tekst er opgekropt en niet visueel nog niet erg sterk. Dit heb ik na de feedback dus ook toegevoegd en aangepast.

Van `versie 1.0`:

![thumb1](readme-img/header1.png)

Naar `versie 2.0`:

![thumb1](readme-img/header2.png)

Tenslotte was het groter bekijken van de foto nog erg kaal en bevatte nog niet de volledige functionaliteit voor het starten van de slideshow. Dit heb toegevoegd. Ook had de achtergrond van de overlay geen goed contrast met de achtergrond van de gallery, dit kwam doordat alle twee de achtergrond kleuren wit waren met een lichtere opacity. Dit heb ik naar een wat donkere achtergrond veranderd.

Van `versie 1.0`:

![thumb1](readme-img/bigimg1.png)

Naar `versie 2.0`:

![thumb1](readme-img/bigimg2.png)

## Toegepaste principes

### 1. Clarity is job #1
Hierbij gaat het om dat de gebruiker ziet wat de interface doet en hoe hij of zij het moet gebruiken. De gebruiker ziet in het overzicht gelijk dat een foto gallerij is. Daarbij kan je niet gelijk zien dat je de foto kan vergroten. Dit heb ik duidelijk proberen te maken door het hoveren over een afbeelding een zoom in icoon weer te geven. Zo is het duidelijker voor de gebruiker dat de afbeelding klikbaar is en er een grotere versie van de foto getoont gaat worden.

### 8. Provide a natural next step
Hierbij gaat het over welke volgende interactie de gebruiker gaat maken en of deze vertrouwd aanvoelt. Als de gebruiker een afbeelding opent kan hij deze sluiten door op het sluit icoon te klikken of door op de achtergrond van de overlay te klikken. Daarnaast kan hij door de afbeeldingen heen navigeren door het toetsenbord te gebruiken of te klikken. Hierdoor is het makkelijk om meerdere foto's te bekijken en kan de gebruiker makkelijk verder na de eerste interactie.

### 11. Strong visual hierarchies work best
Hier gaat het over dat er een duidelijk overzicht is van alle visuele elementen. Hierin is een duidelijke hierarchie zichtbaar tussen belangrijke en minder belangrijke elementen uit de interface. Dit heb ik gedaan door met kleur en diktes van de elementen aan te passen. Daarnaast heb ik bij de positionering gelet op wat belangrijk is en wat niet.


### 14. Progressive disclosure
Bij Progressive disclosure zorg je ervoor dat je alleen het nodige toont op het scherm en niet een overvloed van informatie en instructies toont. Dit heb ik toegepast op het overzicht van afbeeldingen, door niet gelijk alle informatie per foto weer te geven, maar de gebruiker zelf te kiezen door de informatie te tonen als de gebruiker over de afbeelding heen hovert. Zo heeft de gebruiker zelf controle over wat hij of zij wilt zien en maakt het de interactie duidelijker. Dit sluit daarom ook aan bij het principe progressive disclosure.
