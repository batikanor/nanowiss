# Nanowiss sitesinin kaynak kodu
## Kurulum

1. vscode indir
2. git indir. `https://git-scm.com/downloads`
3. `git clone https://github.com/batikanor/nanowiss`
4. vs code ile proje dosyasini ac (nanowiss klasoru)
5. bi integrated terminal ac vs code dan proje dosyasi icinde
6. `git checkout master`
7. `node -v`   komutunu dene. hata verirse https://nodejs.org/en/download/prebuilt-installer ile indir node u.
8. `npm -v`    komutunu dene. Calisiyorsa sorun yok.

* simdi her sey calisir durumda olsa gerek. kendi bilgisayarinda websiteyi denemek icin
`npm install` ve 
`npm start`

* websitenin son halini deploy etmek icin
`npm run deploy`


* github daki son degisiklikleri kendi bilgisayarina cekmek icin
`git pull origin master`

* sitenin kaynak kodunda yaptigin degisikleri GitHub a gondermek icin sirasiyla 
    * `git add .`
    * `git commit -m "Buraya yapilan degisiklikleri acikla"`
    * `git push origin master`



Kurallar
* Deploy etmeden once hep kendi bilgisayarinda websiteyi dene.
* Bu bir static website, dolayisiyla bir backend ekleyemezsin. chatgpt den bir seyler isteyecek olursan bunu da soyle ona
* Herhangi bir sey degistirmek istiyorsan sitede, asagidakileri kopyalayip chatgpt ye yapistir
    * `\src\App.js`
    * `\src\components\Navbar.js`
    * `\src\components\HomePage.js`
    * `\src\components\TeamPage.js`


