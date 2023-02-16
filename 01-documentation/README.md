# Aplikacija za IT konferenciju 'Full stack developer 2023'

Ovo je projekat za ispit iz predmeta Fizičko projektovanje informacionih sistema

Broj indeksa: 2022/3021

Ime i prezime: David Mijić

Školska godina: 2022/2023

## Projektni zahtev

P.1 Aplikacija za IT konferenciju „Full stack developer 2023“

Main page – city style.

Feature 1 Osnovne informacije o konferenciji
Prva strana - Osnovne informacije o konferenciji (Naziv konferencije, Grad, Lokacija održavanja, Datumi održavanja, dodatne informacije).
2 dana konferencije, 1. dan FE, 2. dan BE.
Grid predavanja po danima, po vremenima predavanja sa predavačima (npr. 1. dan, subota, 15. maj, Front-End dan). Naći lepe primere na internetu i iskoristiti.
Broj slobodnih mesta FE/BE (Count iz baze). Zadati maksimalni broj slušalaca i za FE dan i za BE dan (trebalo bi da to bude isti broj).

Feature 2. Prijava na konferenciju
Prijava na konferenciju za BE, za FE ili za oba dana.
2.1. Osnovni podaci (pobrojati precizno koji atributi: Ime*, Prezime*, Kompanija, Adresa1*, Adresa2, Poštanski broj*, Mesto*, Država*, Email*, Potvrda email adrese*)
2.2. Cena1 za FE, Cena2 za BE, (Cena1 + Cena2)*0.9 za oba dana
2.3. Umanjenje cene za 10% na C1 i 10% na C2 do zadatog datuma.
2.4. Prvi put se dobija token za kasniji pristup.
2.5. Dobija se i generisani promo-kod koji može iskoristiti vaš prijatelj i time ostvariti 5% popusta za svaku opciju. Kada neko iskoristi promo-kod, mora se zabeležiti ta promena statusa. Iskorišćeni promo-kod donosi prvo slušaocu poklon (poklon ne treba modelovati).

Feature 3. Izmena prijave
Korišćenje tokena i datog emaila
3.1. Dodavanje dana (1+1) – ako ima slobodnih mesta, obračunaj popuste.
3.2. Oduzimanje dana (2-1) – smanji zaduženje korisnika, pazi nema popuste.

Feature 4. Otkazivanje prijave
Prilikom otkazivanja  unosi se token prijave i emaila.
Otkazivanje prijave - token je trajno pasivan.
Promo-kod otkazane prijave postaje nevažeći.

Napomena: Zanemariti aspekt plaćanja, zabeležiti ukupno dugovanje po korisniku sa specifikacijom stavki i obračunom popusta.

## Tehnička ograničenja

 1. Single Page Web Application

 2. Frontend tehnologije:
  · HTML 5.0
  · CSS 3.0
  · JavaScript/TypeScript
  · React/Angular/Vue.js

 3. Backend tehnologije:
  · Java,
  · .NET,
  · JavaScript/Node.js

 4. Baza podataka po izboru

## Baza podataka
