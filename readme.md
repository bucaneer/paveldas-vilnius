## Apie

Čia yra Vilniaus pastatų surašymo duomenys pagal 2000 - 2001 m. vykdytą 
projektą "Baltic InterSave Vilnius".

Visi duomenys yra surinkti iš [Interneto archyve](https://web.archive.org/web/20090828135402/http://www.paveldas.vilnius.lt/) 
esančių kopijų, nes originali projekto svetainė www.paveldas.vilnius.lt 
yra nebepasiekiama. Interneto archyve išsaugota ne visa projekto 
informacija - liko tik kiek daugiau nei pusė tekstinės informacijos apie 
pastatus (8647 iš 16406) ir mažiau nei 5% nuotraukų (1131 iš apie 28000).

## Peržiūros įrankis

Tekstinę informaciją ir nuotraukas galima peržiūrėti per interneto 
naršyklę atsidarius failą `index.html`.

## Informacijos struktūra

Duomenų sąrašai surinkti JSON formatu failuose `seniunijos.json`, 
`gatves.json`, `adresai.json`, `objektai.json` ir `photos.json`. 
Toliau pateikiama kiekvieno failo objektų struktūra.

### `seniunijos.json`

| Laukelis | Paaiškinimas |
| -------- | ------------ |
| gID      | seniūnijos ID numeris |
| name     | seniūnijos pavadinimas |
| a_total  | bendras skaičius aprašytų seniūnijos pastatų |
| a_info   | skaičius aprašytų seniūnijos pastatų, kurių informacija yra išlikusi |

### `gatves.json`

| Laukelis | Paaiškinimas |
| -------- | ------------ |
| nID      | gatvės ID numeris |
| gID      | seniūnijos ID numeris |
| name     | gatvės pavadinimas |
| a_total  | bendras skaičius aprašytų gatvės pastatų |
| a_info   | skaičius aprašytų gatvės pastatų, kurių informacija yra išlikusi |

### `adresai.json`

| Laukelis | Paaiškinimas |
| -------- | ------------ |
| ID       | pastato ID numeris |
| nID      | gatvės ID numeris |
| gID      | seniūnijos ID numeris |
| adresas  | pastato adresas |
| info     | ar pastato informacija yra išlikusi (0 arba 1) |

### `objektai.json` - išsaugota pastatų informacija

| Laukelis | Paaiškinimas |
| -------- | ------------ |
| ID       | pastato ID numeris |
| nID      | gatvės ID numeris |
| gID      | seniūnijos ID numeris |
| adresas  | pastato adresas |
| lang     | kalba, kuria išsaugoti duomenys ("lt" arba "en") |
| period   | pastato statybų periodas |
| style    | pastato architektūros stilius |
| purpose  | pastato paskirtis |
| floors   | pastato aukštų skaičius |
| arch_v   | architektūrinė vertė (1-9) |
| cult_v   | kultūrinė svarba (1-9) |
| envir_v  | svarba aplinkai (1-9) |
| orig_v   | autentiškumo vertė (1-9) |
| estab_v  | atkūrimo reikšmė (1-9) |
| pressrv_v | išsaugojimo reikšmė (1-9) |
| wall_c   | sienų būklė (1-9) |
| roof_c   | stogo būklė (1-9) |
| windows_c | langų / durų būklė (1-9) |

Vertė ir būklė vertinama balais nuo 1 (geriausia) iki 9 (blogiausia).

### `photos.json` - išsaugotų nuotraukų informacija

| Laukelis | Paaiškinimas |
| -------- | ------------ |
| photo    | nuotraukos failo pavadinimas kataloge "Photo" |
| ID       | pastato ID numeris (vertė `null` jei pastato informacija neišsaugota) |
| nID      | gatvės ID numeris |
| gID      | seniūnijos ID numeris |
| adresas  | pastato adresas |
