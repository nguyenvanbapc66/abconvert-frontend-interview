export const products: (Omit<CartItem, "quantity"> & {
  relevantImage: { id: number; url: string }[];
  description: string;
})[] = [
  {
    id: "1",
    name: "Black Dropper",
    price: 290,
    url: "https://images.unsplash.com/photo-1701056035604-6a7dd0efa0d7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    relevantImage: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1701056035604-6a7dd0efa0d7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1701056035530-ac61089f181a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1695989599251-1c5433b4b47d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1696894756386-d59542525355?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 5,
        url: "https://images.unsplash.com/photo-1695972235496-1a99b8e304fe?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    description: `
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel nemo reiciendis asperiores doloribus. Nostrum
            ipsa magni, nihil molestiae rerum inventore porro doloremque, id minima voluptate ipsam optio commodi
            voluptatem aperiam! Error inventore, dolores voluptas adipisci quia blanditiis repellat natus iste
            necessitatibus deserunt totam iure hic recusandae maxime, odit vero deleniti non velit magni sit perferendis
            accusamus. Eum quis minus rem. Libero asperiores ducimus, rem debitis voluptate quia distinctio maiores
            facilis a veritatis doloribus eveniet natus necessitatibus illum earum nisi reiciendis ad accusamus ipsum
            blanditiis ab iste dolor amet minus. Ut. Repellat libero odio odit nobis vitae nemo, reprehenderit vel
            consequuntur, quos fuga adipisci tempore animi eveniet quod ut doloremque tempora tenetur minima voluptatem?
            Placeat est incidunt tenetur, saepe architecto sint. Doloremque illo natus, quibusdam nihil earum omnis,
            maiores aliquid atque, reiciendis praesentium quo est sint libero necessitatibus soluta reprehenderit?
            Dolore aperiam vero beatae labore nobis tenetur repellat quia quasi quidem.
    `,
  },
  {
    id: "2",
    name: "Black Dropper",
    price: 290,
    url: "https://images.unsplash.com/photo-1701056035604-6a7dd0efa0d7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    relevantImage: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1701056035604-6a7dd0efa0d7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1701056035530-ac61089f181a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1695989599251-1c5433b4b47d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1696894756386-d59542525355?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 5,
        url: "https://images.unsplash.com/photo-1695972235496-1a99b8e304fe?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    description: `
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel nemo reiciendis asperiores doloribus. Nostrum
            ipsa magni, nihil molestiae rerum inventore porro doloremque, id minima voluptate ipsam optio commodi
            voluptatem aperiam! Error inventore, dolores voluptas adipisci quia blanditiis repellat natus iste
            necessitatibus deserunt totam iure hic recusandae maxime, odit vero deleniti non velit magni sit perferendis
            accusamus. Eum quis minus rem. Libero asperiores ducimus, rem debitis voluptate quia distinctio maiores
            facilis a veritatis doloribus eveniet natus necessitatibus illum earum nisi reiciendis ad accusamus ipsum
            blanditiis ab iste dolor amet minus. Ut. Repellat libero odio odit nobis vitae nemo, reprehenderit vel
            consequuntur, quos fuga adipisci tempore animi eveniet quod ut doloremque tempora tenetur minima voluptatem?
            Placeat est incidunt tenetur, saepe architecto sint. Doloremque illo natus, quibusdam nihil earum omnis,
            maiores aliquid atque, reiciendis praesentium quo est sint libero necessitatibus soluta reprehenderit?
            Dolore aperiam vero beatae labore nobis tenetur repellat quia quasi quidem.
    `,
  },
  {
    id: "3",
    name: "Black Dropper",
    price: 290,
    url: "https://images.unsplash.com/photo-1701056035604-6a7dd0efa0d7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    relevantImage: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1701056035604-6a7dd0efa0d7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1701056035530-ac61089f181a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1695989599251-1c5433b4b47d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1696894756386-d59542525355?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 5,
        url: "https://images.unsplash.com/photo-1695972235496-1a99b8e304fe?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    description: `
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel nemo reiciendis asperiores doloribus. Nostrum
            ipsa magni, nihil molestiae rerum inventore porro doloremque, id minima voluptate ipsam optio commodi
            voluptatem aperiam! Error inventore, dolores voluptas adipisci quia blanditiis repellat natus iste
            necessitatibus deserunt totam iure hic recusandae maxime, odit vero deleniti non velit magni sit perferendis
            accusamus. Eum quis minus rem. Libero asperiores ducimus, rem debitis voluptate quia distinctio maiores
            facilis a veritatis doloribus eveniet natus necessitatibus illum earum nisi reiciendis ad accusamus ipsum
            blanditiis ab iste dolor amet minus. Ut. Repellat libero odio odit nobis vitae nemo, reprehenderit vel
            consequuntur, quos fuga adipisci tempore animi eveniet quod ut doloremque tempora tenetur minima voluptatem?
            Placeat est incidunt tenetur, saepe architecto sint. Doloremque illo natus, quibusdam nihil earum omnis,
            maiores aliquid atque, reiciendis praesentium quo est sint libero necessitatibus soluta reprehenderit?
            Dolore aperiam vero beatae labore nobis tenetur repellat quia quasi quidem.
    `,
  },
  {
    id: "4",
    name: "Black Dropper",
    price: 290,
    url: "https://images.unsplash.com/photo-1701056035604-6a7dd0efa0d7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    relevantImage: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1701056035604-6a7dd0efa0d7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1701056035530-ac61089f181a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1695989599251-1c5433b4b47d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1696894756386-d59542525355?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 5,
        url: "https://images.unsplash.com/photo-1695972235496-1a99b8e304fe?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    description: `
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel nemo reiciendis asperiores doloribus. Nostrum
            ipsa magni, nihil molestiae rerum inventore porro doloremque, id minima voluptate ipsam optio commodi
            voluptatem aperiam! Error inventore, dolores voluptas adipisci quia blanditiis repellat natus iste
            necessitatibus deserunt totam iure hic recusandae maxime, odit vero deleniti non velit magni sit perferendis
            accusamus. Eum quis minus rem. Libero asperiores ducimus, rem debitis voluptate quia distinctio maiores
            facilis a veritatis doloribus eveniet natus necessitatibus illum earum nisi reiciendis ad accusamus ipsum
            blanditiis ab iste dolor amet minus. Ut. Repellat libero odio odit nobis vitae nemo, reprehenderit vel
            consequuntur, quos fuga adipisci tempore animi eveniet quod ut doloremque tempora tenetur minima voluptatem?
            Placeat est incidunt tenetur, saepe architecto sint. Doloremque illo natus, quibusdam nihil earum omnis,
            maiores aliquid atque, reiciendis praesentium quo est sint libero necessitatibus soluta reprehenderit?
            Dolore aperiam vero beatae labore nobis tenetur repellat quia quasi quidem.
    `,
  },
  {
    id: "5",
    name: "Black Dropper",
    price: 290,
    url: "https://images.unsplash.com/photo-1701056035604-6a7dd0efa0d7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    relevantImage: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1701056035604-6a7dd0efa0d7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1701056035530-ac61089f181a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1695989599251-1c5433b4b47d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1696894756386-d59542525355?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 5,
        url: "https://images.unsplash.com/photo-1695972235496-1a99b8e304fe?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    description: `
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel nemo reiciendis asperiores doloribus. Nostrum
            ipsa magni, nihil molestiae rerum inventore porro doloremque, id minima voluptate ipsam optio commodi
            voluptatem aperiam! Error inventore, dolores voluptas adipisci quia blanditiis repellat natus iste
            necessitatibus deserunt totam iure hic recusandae maxime, odit vero deleniti non velit magni sit perferendis
            accusamus. Eum quis minus rem. Libero asperiores ducimus, rem debitis voluptate quia distinctio maiores
            facilis a veritatis doloribus eveniet natus necessitatibus illum earum nisi reiciendis ad accusamus ipsum
            blanditiis ab iste dolor amet minus. Ut. Repellat libero odio odit nobis vitae nemo, reprehenderit vel
            consequuntur, quos fuga adipisci tempore animi eveniet quod ut doloremque tempora tenetur minima voluptatem?
            Placeat est incidunt tenetur, saepe architecto sint. Doloremque illo natus, quibusdam nihil earum omnis,
            maiores aliquid atque, reiciendis praesentium quo est sint libero necessitatibus soluta reprehenderit?
            Dolore aperiam vero beatae labore nobis tenetur repellat quia quasi quidem.
    `,
  },
  {
    id: "6",
    name: "Black Dropper",
    price: 290,
    url: "https://images.unsplash.com/photo-1701056035604-6a7dd0efa0d7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    relevantImage: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1701056035604-6a7dd0efa0d7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1701056035530-ac61089f181a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1695989599251-1c5433b4b47d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1696894756386-d59542525355?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 5,
        url: "https://images.unsplash.com/photo-1695972235496-1a99b8e304fe?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    description: `
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel nemo reiciendis asperiores doloribus. Nostrum
            ipsa magni, nihil molestiae rerum inventore porro doloremque, id minima voluptate ipsam optio commodi
            voluptatem aperiam! Error inventore, dolores voluptas adipisci quia blanditiis repellat natus iste
            necessitatibus deserunt totam iure hic recusandae maxime, odit vero deleniti non velit magni sit perferendis
            accusamus. Eum quis minus rem. Libero asperiores ducimus, rem debitis voluptate quia distinctio maiores
            facilis a veritatis doloribus eveniet natus necessitatibus illum earum nisi reiciendis ad accusamus ipsum
            blanditiis ab iste dolor amet minus. Ut. Repellat libero odio odit nobis vitae nemo, reprehenderit vel
            consequuntur, quos fuga adipisci tempore animi eveniet quod ut doloremque tempora tenetur minima voluptatem?
            Placeat est incidunt tenetur, saepe architecto sint. Doloremque illo natus, quibusdam nihil earum omnis,
            maiores aliquid atque, reiciendis praesentium quo est sint libero necessitatibus soluta reprehenderit?
            Dolore aperiam vero beatae labore nobis tenetur repellat quia quasi quidem.
    `,
  },
];
