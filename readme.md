# Zwei Fehler

## Problem beim beseitigen des Fehler Nr. 1

Wenn wir 6 Commits haben

```
1
2
3
4
5 FEHLER
6
```

und der `5` hat einen Fehler. Dann haben wir ihn ja bisher im Commit `1` rückgängig gemacht.
Dies erstellte einen neuen, fehlerfreien (was Fehler Nr. 1 angeht) Commit.

In den Commits `1` bis `4` war der Fehler aber noch vorhanden:

```
R -FEHLER
1 FEHLER
2 FEHLER
3 FEHLER
4 FEHLER
5 FEHLER
6
```

`R` ist der Revert-Commit. Also der beseitigte Fehler.

---

## Fehler in allen Commits beseitigen

Hierzu machen wir

1. den Revert NICHT im Commit `1` sondern im Commit vor dem Fehler-Commit. Also im `4`.
2. Und das nicht im Main-Branch sondern in einem extra Banch. Nennen wir in `fix`

```
git checkout c2e864d
git branch fix
git checkout fix
```

Wir wechseln also in den Commit VOR dem Fehlerhaften Branch (Zeitlich gesehen der danach).

In unserem Beispiel wäre es Commit `4`.

Erstellen ein Branch und wechseln in diesen.

Hier machen wir nun das Revert

```
git revert ba8d09e
```

Nun haben wir den `4` Branch korrigiergt. Diese Änderungen muss sich nun auf alle Branches danach (`3`, `2`, `1`) auswirken!

Dies erreichen wir mit einem Rebase

```
git checkout zwei
git rebase fix
```

Anschließend können wir den branch `fix` löschen

```
git branch -d fix
```

Nun hat im `zwei` Branch KEIN Commit mehr den Fehler (außer der Commit, in dem wir den Fehler "eingebaut" haben).

Also `5` hat noch den Fehler, aber `1` bis `4` nicht mehr.

Nun können wir den zweiten Fehler genauso suchen. Aber trotzdem ist der Commit mit dem Fehler (also die `5`) als `FIRST GOOD` zu betitteln:

```
git bisect start
git bisect good ba8d09e
git bisect bad HEAD
```

Dann wieder `node t.js`, `git bisect good` oder `git bisect bad` bis wir den Fehler-Commit gefunden haben.

Dies ist `Weiterer Fehler`.

