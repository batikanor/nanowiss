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

* 28 Ekim 2026 tarihli proje sahibinin tercihine göre üretim GitHub Pages,
  staging ise Hetzner üzerinde yayınlanır. DNS değişikliği gerekli değildir.
  Ayrıntılar: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).
* Hukuki bilgiler tamamlandıktan sonra yayın paketini doğrulamak için
  `npm run build:release` ve `npm run test:legal` çalıştırın.
* Impressum ve gizlilik bilgilerinin kaynağı:
  [src/content/legal-details.json](src/content/legal-details.json).
  Eksik alanlar tamamlanmadan hukuki sayfalar taslaktır;
  [docs/LEGAL-NOTICES.md](docs/LEGAL-NOTICES.md) açıklamasına bakın.


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



## Current publishing

The owner chose GitHub Pages production at https://www.nanowiss.com/ and Hetzner
staging at https://staging.nanowiss.com/ on 28 October 2026. Use the current
[deployment runbook](docs/DEPLOYMENT.md); no production DNS change is needed.
