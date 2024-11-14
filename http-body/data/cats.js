let cats = [
    {
        id: 0,
        name: "Jiji",
        color: "black",
        human: "Kiki",
        image: "/images/jiji.png"
    },
    {
        id: 1, 
        name: "Lion",
        color: "pink",
        human: "Steven",
        image: "/images/lion.png"
    },
    {
        id: 2,
        name: "Hobbes",
        color: "orange and black",
        human: "Calvin",
        image: "/images/hobbes.png"
    },
];

// We store the id in a global variable --
// this is a stand-in solution for our in-memory data implementation.
let currentId = cats.length - 1;
const nextId = () => {
    currentId += 1;
    return currentId;
}

const getCats = () => {
    return cats;
};
const getCat = (id) => {
    return cats.find(cat => cat.id === id);
};

const createCat = (data) => {
    const newCat = {
        id: nextId(),
        ...data // spread operator injects fields of a passed object into new object
        /* could also write as:
        name: data.name;
        color: data.color;
        human: data.human;
        image: data.image;
        */
    }
    cats.push(newCat);
    return newCat;
};

const updateCat = (id, data) => {
    let catToUpdate = cats.find(cat => cat.id === id);

    cats = cats.map(cat => {
        if (cat.id !== id) {
            return cat;
        }

        let updatedCat = {
            ...catToUpdate,
            ...data // overwrites the field of interest
        }
        return updatedCat;
    })

    let updatedCat = cats.find(cat => cat.id === id);
    return updatedCat;
};

const deleteCat = (id) => {
};

export {getCats, getCat, createCat, updateCat, deleteCat};