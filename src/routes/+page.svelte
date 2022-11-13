<svelte:head>
  <title>Çift Dikiş | Tshirt ve daha fazlası...</title>
</svelte:head>

<script>
  const items = [{
    name: "Hagi",
    price: 300,
    img: "https://i.ibb.co/dbY4HGN/296870080-429779835598845-8879077516993417425-n.jpg"
  }, {
    name: "Alex",
    price: 250,
    img: "https://i.ibb.co/rv1hfPk/294894055-401807391864107-2541225990443624659-n.jpg"
  }, {
    name: "Sergen",
    price: 159,
    img: "https://i.ibb.co/Gt97X7H/296634870-625735479122775-3688579193057263285-n.jpg"
  }, {
    name: "Bozkurt",
    price: 500,
    img: "https://i.ibb.co/r4T1mPP/293727769-1116299248962670-2247192147148517299-n.jpg"
  }, {
    name: "Wesley Sneijder",
    price: 159,
    img: "https://i.ibb.co/DR3nB2g/298200649-746239539824724-377260391141386800-n.jpg"
  }];
</script>

<div class="flex flex-row gap-2 justify-center items-center p-10">
  <img class="h-16" src="https://clipground.com/images/sewing-machine-icon-png-3.png" alt="Logo">
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-3xl font-bold p-2">Çift Dikiş</h1>
    <p class="text-l italic">Hoşgeldiniz</p>
  </div>
</div>

<div class="flex flex-wrap gap-5 justify-center items-center">
  {#each items as item}
    <div class="card w-96 bg-base-100 shadow-xl cursor-pointer mb-7">
      <figure><img class="h-72" src="{item.img}" alt="Tshirt" /></figure>
      <div class="card-body">
        <h2 class="card-title">{item.name}</h2>
        <p>Bugün satın al</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">{item.price} ₺</button>
        </div>
      </div>
    </div>
  {/each}
</div>
