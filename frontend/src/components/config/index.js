import { data } from "autoprefixer";
import axios from "axios";


export const registerFormControls = [
  {
    name: 'userName',
    label: 'User Name',
    placeholder: 'Enter your user name',
    commponentType: 'input',
    type: 'text'
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    commponentType: 'input',
    type: 'email'
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    commponentType: 'input',
    type: 'password'
  }
]

export const loginFormControls = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    commponentType: 'input',
    type: 'email'
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    commponentType: 'input',
    type: 'password'
  }
]

export const categoryFormControls = [
  {
    name: 'id',
    label: 'Category',
    placeholder: 'Enter Category',
    commponentType: 'input',
    type: 'text'
  },
  {
    name: 'label',
    label: 'Category Name',
    placeholder: 'Enter Category Name',
    commponentType: 'input',
    type: 'text'
  }
]

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/admin/category/getcategory');
    return response.data;
  } catch (error) {
    return [];
  }
}

const fetchPublishers = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/admin/publisher/getpublisher')
    return response.data;
  } catch (error) {
    return [];
  }
}

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: 'text',
    placeholder: "Enter product title"
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [

    ]
  },
  {
    label: "Publisher",
    name: "publisher",
    componentType: "select",
    options: [
     
    ]
  },
  {
    label: "Author",
    name: "author",
    componentType: "input",
    type: 'text',
    placeholder: "Enter product author"
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
]

export const filterOptions = {
  category: [
  ],
  publisher: [
    { id: "penguin", label: "Penguin Random House" },
    { id: "harpercollins", label: "HarperCollins" },
    { id: "simon-schuster", label: "Simon & Schuster" },
    { id: "macmillan", label: "Macmillan" },
    { id: "hachette", label: "Hachette" },
    { id: "scholastic", label: "Scholastic" },
    { id: "oxford", label: "Oxford University Press" },
    { id: "cambridge", label: "Cambridge University Press" },
    { id: "bloomsbury", label: "Bloomsbury" },
    { id: "randomhouse", label: "Random House" },
    { id: "knopf", label: "Knopf Doubleday" },
    { id: "vintage", label: "Vintage Books" },
    { id: "wiley", label: "Wiley" },
    { id: "pearson", label: "Pearson" },
    { id: "tor", label: "Tor Books" }
  ],
};

const initializeCategoryOptions = async () => {
  const categories = await fetchCategories().then((data) => {
    addProductFormElements[1].options = data.data.map(cat => ({
      id: cat.id, // Hoặc cat._id tùy thuộc vào cấu trúc của category
      label: cat.label
    }))
    filterOptions.category = data.data.map(cat => ({
      id: cat.id, // Hoặc cat._id tùy thuộc vào cấu trúc của category
      label: cat.label
    }))
  }
  );
};

const initializePublisherOptions = async () => {
  const publishers = await fetchPublishers().then((data) => {
    addProductFormElements[2].options = data.data.map(pub => ({
      id: pub.id, // Hoặc cat._id tùy thuộc vào cấu trúc của category
      label: pub.label
    }))
    filterOptions.publisher = data.data.map(pub => ({
      id: pub.id, // Hoặc cat._id tùy thuộc vào cấu trúc của category
      label: pub.label
    }))
  })
}
initializePublisherOptions();
initializeCategoryOptions();

export const categoryOptionsMap = {
  "fiction": "Fiction",
  "nonfiction": "Non-Fiction",
  "mystery": "Mystery & Thriller",
  "fantasy": "Fantasy",
  "scifi": "Science Fiction",
  "romance": "Romance",
  "historical": "Historical Fiction",
  "biography": "Biography & Memoir",
  "selfhelp": "Self-Help",
  "children": "Children's Books",
  "youngadult": "Young Adult",
  "poetry": "Poetry",
  "horror": "Horror",
  "travel": "Travel",
  "business": "Business & Economics"
}

export const publisherOptionsMap = {
  "penguin": "Penguin Random House",
  "harpercollins": "HarperCollins",
  "simon-schuster": "Simon & Schuster",
  "macmillan": "Macmillan",
  "hachette": "Hachette",
  "scholastic": "Scholastic",
  "oxford": "Oxford University Press",
  "cambridge": "Cambridge University Press",
  "bloomsbury": "Bloomsbury",
  "randomhouse": "Random House",
  "knopf": "Knopf Doubleday",
  "vintage": "Vintage Books",
  "wiley": "Wiley",
  "pearson": "Pearson",
  "tor": "Tor Books"
}

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "contact",
    label: "Contact",
    path: "/shop/contact",
  },
  {
    id: "blog",
    label: "Blog",
    path: "/shop/blog",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
