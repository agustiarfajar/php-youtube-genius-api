<?php 
include_once("layout.php");
?>
<?php style() ?>
<?php navbar() ?>
<div class="container">
    <h2 align="center">Rapidapi Genius Lyrics dan Youtube Search API V3</h2>
    <h4>
        Tentang
    </h4>
    <p>
        Website ini digunakan untuk mencari video dari youtube dikhususkan bergenre musik serta dapat memilih lirik
        yang tersedia berdasarkan masukan.
    </p>
    <h4>API yang digunakan</h4>
    <p>
        <ol>
            <li>Search Youtube API V3</li>
            <li>Rapidapi Genius Lyrics API</li>
        </ol>
    </p>
    <h4>Penggunaan</h4>
    <p>
        Cara menggunakan API sangat mudah, anda hanya memasukan sebuah keyword artis atau lagu di dalam form masukan 
        lalu menekan tombol cari. Lalu akan muncul video dari youtube serta beberapa list lirik lagu, anda dapat menekan tombol Lihat Lirik untuk
        melihat lirik yang dipilih.<br>
        Output video dari youtube saya limit 2 buah video.<br>
        <a href="api.php" class="btn btn-outline-primary" target="_blank">Coba Sekarang</a>
    </p>
</div>
<?php footer() ?>