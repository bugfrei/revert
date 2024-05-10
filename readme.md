# bisect & revert

## Testen
Wir sind auf branch "main" und starten die app

```
node t.js
```

Sie funktioniert nicht!

## Fehlersuche mit git bisect

Wir suchen mit `git bisect` nun den Commit mit dem Fehler:

```
git bisect start
git bisect bad HEAD     -> HEAD Commit, den wir getestet hatten
git bisect good 18e92c7 -> Initial, da hat auf jedenfall alles funktioniert
```

Nun führen wir `node t.js` aus, funktoniert die App geben wir

```
git bisect good
```

ein, funktioniert sie nicht dann

```
git bisect bad
```

Irgendwann wir angezeigt, das `ba8d09e` der Commit mit dem Fehler ist.

## Fehler entfernen

Damit die App schnellst möglichst wieder geht, entfernen wir erstmal nur den Fehler.

```
git checkout main
```

Erstmal in den main-Branch wechseln. Die Änderung soll ja direkt in der aktuellen Version der App rückgängig gemacht werden.

```
git revert ba8d09e
```

Damit erstellen wir einen neuen Commit OHNE die Änderung der Commits, in dem der Fehler war.
Jetzt haben wir die App im aktuellsten Zustand, jedoch ohne den fehlerhaften Code und das, was der eigentlich machen sollte.

Nun läuft die App wieder, wir können deployen. Alles erstmal i.o.

Danach könnten wir von `3063898` in Ruhe den Fehler suchen, beheben und neu deployen.

# Noch cooler

wir verschieben Zeile 3 bis Zeile 13
// Kunde möchte
...
}

Also die function und die 5 Aufrufe ans Ende des Codes.

Wir verschieben also den Teil, der im `ba8d09e` Commit den Fehler hat.

Nach dem Verschieben adden und commiten wir

```
git add .
git commit -m "Funktion / Call an Ende verschoben"
```

Nun wieder der `bisect` Ablauf.

Am Ende sehen wir, das der Fehler korrekt aus der `hello` function entfernt wurde. Obwohl diese sich an einer anderen Stelle befindet.

Den function-Call `hello()` können wir nun noch in `hello(jdata)` ändern.
Die function `hello()` den Parameter `hello(daten)` geben und `console.log(daten)` einfügen.

Oder wir reverten den HEAD (also das Revert reverten) 

```
git revert HEAD
```

fügen den Parameter (`function hello(daten)`) und das Argument `hello(jdata)` hinzu.

# Mehrere Fehler eingebaut?
Sollte es nach dem gefundenen Fehler-Commit noch weitere Commits mit Fehler geben, so ist zu beachten das sich der erste GOOD Commit

```
git bisect good 18e92c7
```

Was ja der Initial-Commit war auf den Commit verschiebt, der zuvor als erster BAD gefunden wurde. Also der `ba8d09e Add Data-Output in Hello World function`

`git bisect good ba8d09e`

Ansonsten wird immer wieder dieser Commit als Fehlerhaft gefunden. Aber da wir diesen

1. schon als fehlerhaft erkannt haben
2. mit `git revert` Rückgängig gemacht haben

können wir ihn als `good` angeben und den nächsten Fehler zwischen HEAD und dem rückgängig gemacht Commit suchen.

Bei einem dritten Fehler wäre dann der BAD Commit vom 2. Fehler wieder der erste GOOD Commit. Usw.

> Wichtig! Wenn mehrere Commits der im HEAD rückgägig gemachts Fehler beinhalten, dann könnten diese noch den gleichen (bereits behobenen) Fehler werfen.
> In diesem Fall wäre dies dann aber nicht BAD sondern GOOD, wir suchen ja den neuen Fehler!
> Kann dieser nicht erkannt werden, da der alte Fehler zum Programmabbruch führt und es gar nicht zum zweiten Fehler kommt. Dann müsste man mittels branch und rebase den Fehlerhaften Commit in alle Commits entfernen!
> Solche eine Situation habe ich im Branch `zwei` beschrieben (`git checkout zwei`)

