<?php 
include_once("layout.php");
?>
<?php style() ?>
<?php navbar() ?>
<div class="container">
    <h1>Cari Video dan Lirik</h1>
    <form action="" id="formz" autocomplete="off">
        <div class="row">
            <div class="col-10">
                <div class="form-group">
                    <input type="text" id="cari" name="cari" class="form-control" onkeypress="handle(event)" placeholder="Cari artis/lagu">
                </div>
            </div>
            <div class="col-2">
                <button id="searchButton" type="button" class="btn btn-outline-primary">Cari</button>
            </div>
        </div>
    </form>
    <div class="row" id="youtube">
        
    </div>
    <section id="result">
        
    </section>
</div>
<script src="https://genius.codes"></script>
<script src="script2.js"></script>
<?php footer() ?>