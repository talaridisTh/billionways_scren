export interface Category {
    name: string;
    image: string;
    alternatives?: string[];
}

export interface Subcategory {
    name: string;
    image: string;
    alternatives?: string[];
}

export interface Store {
    name: string;
    image: string;
    rating: string;
    reviews: string;
    type: string;
    time: string;
    distance: string;
    tag: string;
    tagColor: string;
    openUntil: string;
    hasCredit?: boolean;
    alternatives?: string[];
}

export interface CategoryData {
    subcategories: Subcategory[];
    stores: Record<string, Store[]>;
}

export const mainCategories: Category[] = [
    {
        name: 'Gastronomy',
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        alternatives: [
            'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=200&q=80',
            'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=200&q=80',
            'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=200&q=80',
            'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=200&q=80',
        ],
    },
    {
        name: 'Cosmetics',
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        alternatives: [
            'https://images.unsplash.com/photo-1512203492609-8f0f4b4a3f87?auto=format&fit=crop&w=200&q=80',
            'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=200&q=80',
            'https://images.unsplash.com/photo-1556228724-4e447ef9b3f5?auto=format&fit=crop&w=200&q=80',
            'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=200&q=80',
        ],
    },
    {
        name: 'Electrical',
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        alternatives: [
            'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=200&q=80',
            'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=200&q=80',
            'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=200&q=80',
            'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=200&q=80',
        ],
    },
    {
        name: 'Restaurants',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        alternatives: [
            'https://images.unsplash.com/photo-1528605105345-5344ea20e269?auto=format&fit=crop&w=200&q=80',
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80',
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=200&q=80',
            'https://images.unsplash.com/photo-1452968019206-08f18de4b3c7?auto=format&fit=crop&w=200&q=80',
        ],
    },
];

export const categoryData: Record<string, CategoryData> = {
    Gastronomy: {
        subcategories: [
            {
                name: 'Restaurants',
                image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                alternatives: [
                    'https://images.unsplash.com/photo-1528605105345-5344ea20e269?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1452968019206-08f18de4b3c7?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=200&q=80',
                ],
            },
            {
                name: 'Cafés',
                image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                alternatives: [
                    'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=200&q=80',
                ],
            },
            {
                name: 'Bars',
                image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                alternatives: [
                    'https://images.unsplash.com/photo-1498654200943-1088dd4438ae?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1509401934319-c09cfd6a5b0b?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1514361892635-6cfb51d3ed14?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1514362545857-3bc16c4c76a1?auto=format&fit=crop&w=200&q=80',
                ],
            },
            {
                name: 'Bakeries',
                image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                alternatives: [
                    'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1519681398290-17f4407e5a88?auto=format&fit=crop&w=200&q=80',
                ],
            },
            {
                name: 'Food Trucks',
                image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=200&q=80',
                alternatives: [
                    'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=200&q=80',
                ],
            },
            {
                name: 'Desserts',
                image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                alternatives: [
                    'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1541976076758-347942db1970?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=200&q=80',
                ],
            },
        ],
        stores: {
            Restaurants: [
                {
                    name: 'Deluxe Restaurant',
                    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    rating: '4.1',
                    reviews: '84',
                    type: 'Gastronomy, Restaurant',
                    time: '15-25 min',
                    distance: '200m',
                    tag: '10% Discount',
                    tagColor: '',
                    openUntil: '22:00',
                    alternatives: [
                        'https://images.unsplash.com/photo-1528605105345-5344ea20e269?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1452968019206-08f18de4b3c7?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1484318571209-661cf29a69c3?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
                {
                    name: 'Fine Dining Palace',
                    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    rating: '4.7',
                    reviews: '156',
                    type: 'Gastronomy, Fine Dining',
                    time: '20-30 min',
                    distance: '450m',
                    tag: '15% Discount',
                    tagColor: '',
                    openUntil: '23:00',
                    alternatives: [
                        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1490717064594-3bd2c4081697?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1533777324565-a040eb52fac1?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
            ],
            Cafés: [
                {
                    name: 'Café Specialty',
                    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    rating: '4.8',
                    reviews: '89',
                    type: 'Gastronomy, Café',
                    time: '5-15 min',
                    distance: '150m',
                    tag: '20% Discount',
                    tagColor: '',
                    openUntil: '23:00',
                    alternatives: [
                        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1509043759401-136742328bb3?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1461988091159-192b6df7054f?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
                {
                    name: 'Coffee Corner',
                    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    rating: '4.5',
                    reviews: '123',
                    type: 'Gastronomy, Coffee Shop',
                    time: '8-12 min',
                    distance: '100m',
                    tag: '25% Discount',
                    tagColor: '',
                    openUntil: '20:00',
                    alternatives: [
                        'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1528697203043-733bfdca7b38?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
            ],
            Bars: [
                {
                    name: 'Downtown Bistro',
                    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    rating: '4.3',
                    reviews: '156',
                    type: 'Gastronomy, Bar & Restaurant',
                    time: '10-20 min',
                    distance: '350m',
                    tag: '15% Discount',
                    tagColor: '',
                    openUntil: '01:00',
                    alternatives: [
                        'https://images.unsplash.com/photo-1498654200943-1088dd4438ae?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1514361892635-6cfb51d3ed14?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1509401934319-c09cfd6a5b0b?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
                {
                    name: 'Cocktail Lounge',
                    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    rating: '4.6',
                    reviews: '234',
                    type: 'Gastronomy, Cocktail Bar',
                    time: '15-25 min',
                    distance: '280m',
                    tag: '20% Discount',
                    tagColor: '',
                    openUntil: '02:00',
                    alternatives: [
                        'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1541976076758-347942db1970?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1532635046-26909d0d4b6a?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1514362545857-3bc16c4c76a1?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
            ],
            Bakeries: [
                {
                    name: 'Fresh Bakery',
                    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    rating: '4.6',
                    reviews: '234',
                    type: 'Gastronomy, Bakery',
                    time: '8-12 min',
                    distance: '100m',
                    tag: '25% Discount',
                    tagColor: '',
                    openUntil: '19:00',
                    alternatives: [
                        'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1564128442409-0b486d0598d7?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
                {
                    name: 'Artisan Bread Co.',
                    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    rating: '4.8',
                    reviews: '189',
                    type: 'Gastronomy, Artisan Bakery',
                    time: '12-18 min',
                    distance: '220m',
                    tag: '30% Discount',
                    tagColor: '',
                    openUntil: '18:00',
                    alternatives: [
                        'https://images.unsplash.com/photo-1486887396153-fa416526c108?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1475855581690-80accde3ae2b?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
            ],
            'Food Trucks': [
                {
                    name: 'Gourmet Street Food',
                    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    rating: '4.4',
                    reviews: '67',
                    type: 'Gastronomy, Food Truck',
                    time: '5-10 min',
                    distance: '80m',
                    tag: '18% Discount',
                    tagColor: '',
                    openUntil: '22:00',
                    alternatives: [
                        'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
            ],
            Desserts: [
                {
                    name: 'Sweet Dreams',
                    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    rating: '4.9',
                    reviews: '145',
                    type: 'Gastronomy, Dessert Shop',
                    time: '10-15 min',
                    distance: '180m',
                    tag: '22% Discount',
                    tagColor: '',
                    openUntil: '21:00',
                    alternatives: [
                        'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1541976076758-347942db1970?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
            ],
        },
    },
    Cosmetics: {
        subcategories: [
            {
                name: 'Hair Salons',
                image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                alternatives: [
                    'https://images.unsplash.com/photo-1519751138087-5a3a3f54d76a?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1503951458645-643d53bfd60f?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=200&q=80',
                ],
            },
            {
                name: 'Nail Studios',
                image: 'https://images.unsplash.com/photo-1604654894611-6973b376cbde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                alternatives: [
                    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1512499617640-c2f999098c83?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=80',
                ],
            },
            {
                name: 'Beauty Spa',
                image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                alternatives: [
                    'https://images.unsplash.com/photo-1556228724-4e447ef9b3f5?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1520975922325-24baf30275c3?auto=format&fit=crop&w=200&q=80',
                ],
            },
            {
                name: 'Makeup',
                image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                alternatives: [
                    'https://images.unsplash.com/photo-1512203492609-8f0f4b4a3f87?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=200&q=80',
                ],
            },
            {
                name: 'Skincare',
                image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                alternatives: [
                    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1556228724-4e447ef9b3f5?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1512203492609-8f0f4b4a3f87?auto=format&fit=crop&w=200&q=80',
                ],
            },
        ],
        stores: {
            'Hair Salons': [
                {
                    name: 'Stylish Hair Salon',
                    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    rating: '4.5',
                    reviews: '156',
                    type: 'Cosmetics, Hair Salon',
                    time: '10-20 min',
                    distance: '350m',
                    tag: '20% Discount',
                    tagColor: '',
                    openUntil: '20:00',
                    alternatives: [
                        'https://images.unsplash.com/photo-1519751138087-5a3a3f54d76a?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1503951458645-643d53bfd60f?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
                {
                    name: 'Elite Hair Studio',
                    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    rating: '4.7',
                    reviews: '203',
                    type: 'Cosmetics, Premium Hair Salon',
                    time: '15-30 min',
                    distance: '420m',
                    tag: '25% Discount',
                    tagColor: '',
                    openUntil: '21:00',
                    alternatives: [
                        'https://images.unsplash.com/photo-1559599101-bc38c2b95b1b?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1520975922325-24baf30275c3?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
            ],
            'Nail Studios': [
                {
                    name: 'Luxury Nail Studio',
                    image: 'https://images.unsplash.com/photo-1604654894611-6973b376cbde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    rating: '4.7',
                    reviews: '89',
                    type: 'Cosmetics, Nail Art',
                    time: '15-30 min',
                    distance: '280m',
                    tag: '30% Discount',
                    tagColor: '',
                    openUntil: '21:00',
                    alternatives: [
                        'https://images.unsplash.com/photo-1512499617640-c2f999098c83?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
            ],
            'Beauty Spa': [
                {
                    name: 'Beauty Spa Center',
                    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    rating: '4.8',
                    reviews: '203',
                    type: 'Cosmetics, Spa & Wellness',
                    time: '20-35 min',
                    distance: '450m',
                    tag: '25% Discount',
                    tagColor: '',
                    openUntil: '22:00',
                    alternatives: [
                        'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1556228724-4e447ef9b3f5?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1520975922325-24baf30275c3?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
            ],
            Makeup: [
                {
                    name: 'Makeup Studio Pro',
                    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    rating: '4.6',
                    reviews: '127',
                    type: 'Cosmetics, Makeup Artist',
                    time: '25-40 min',
                    distance: '600m',
                    tag: '15% Discount',
                    tagColor: '',
                    openUntil: '19:00',
                    alternatives: [
                        'https://images.unsplash.com/photo-1512203492609-8f0f4b4a3f87?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1512499617640-c2f999098c83?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
            ],
            Skincare: [
                {
                    name: 'Glow Skincare Clinic',
                    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    rating: '4.9',
                    reviews: '156',
                    type: 'Cosmetics, Skincare Specialist',
                    time: '30-45 min',
                    distance: '520m',
                    tag: '20% Discount',
                    tagColor: '',
                    openUntil: '18:00',
                    alternatives: [
                        'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1556228724-4e447ef9b3f5?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1512203492609-8f0f4b4a3f87?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
            ],
        },
    },
    Electrical: {
        subcategories: [
            {
                name: 'Electricians',
                image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                alternatives: [
                    'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=200&q=80',
                ],
            },
            {
                name: 'Tech Repair',
                image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                alternatives: [
                    'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=200&q=80',
                ],
            },
            {
                name: 'Home Automation',
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80',
                alternatives: [
                    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=200&q=80',
                ],
            },
            {
                name: 'Electronics Store',
                image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                alternatives: [
                    'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=200&q=80',
                ],
            },
            {
                name: 'Solar Panels',
                image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                alternatives: [
                    'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1509395176047-4a66953fd230?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=200&q=80',
                ],
            },
        ],
        stores: {
            Electricians: [
                {
                    name: 'Expert Electricians',
                    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                    rating: '4.2',
                    reviews: '127',
                    type: 'Electrical/Craftsmen, Electrician',
                    time: '20-30 min',
                    distance: '500m',
                    tag: '15% Discount',
                    tagColor: '',
                    openUntil: '18:00',
                    alternatives: [
                        'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
            ],
            'Tech Repair': [
                {
                    name: 'TechFix Repair Center',
                    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    rating: '4.4',
                    reviews: '89',
                    type: 'Electrical, Tech Repair',
                    time: '15-25 min',
                    distance: '300m',
                    tag: '20% Discount',
                    tagColor: '',
                    openUntil: '19:00',
                    alternatives: [
                        'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
            ],
            'Home Automation': [
                {
                    name: 'Smart Home Solutions',
                    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    rating: '4.6',
                    reviews: '156',
                    type: 'Electrical, Home Automation',
                    time: '30-45 min',
                    distance: '750m',
                    tag: '10% Discount',
                    tagColor: '',
                    openUntil: '17:00',
                    alternatives: [
                        'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
            ],
            'Electronics Store': [
                {
                    name: 'ElectroMart Store',
                    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    rating: '4.3',
                    reviews: '234',
                    type: 'Electrical, Electronics Retail',
                    time: '10-20 min',
                    distance: '400m',
                    tag: '25% Discount',
                    tagColor: '',
                    openUntil: '21:00',
                    alternatives: [
                        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
            ],
            'Solar Panels': [
                {
                    name: 'Green Energy Solutions',
                    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    rating: '4.5',
                    reviews: '98',
                    type: 'Electrical, Solar Installation',
                    time: '45-60 min',
                    distance: '800m',
                    tag: '12% Discount',
                    tagColor: '',
                    openUntil: '17:00',
                    alternatives: [
                        'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1560958089-b8a1a3b61d8f?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
            ],
        },
    },
    Restaurants: {
        subcategories: [
            {
                name: 'Fine Dining',
                image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                alternatives: [
                    'https://images.unsplash.com/photo-1528605105345-5344ea20e269?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1452968019206-08f18de4b3c7?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1484318571209-661cf29a69c3?auto=format&fit=crop&w=200&q=80',
                ],
            },
            {
                name: 'Fast Food',
                image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=200&q=80',
                alternatives: [
                    'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=200&q=80',
                ],
            },
            {
                name: 'Ethnic Cuisine',
                image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                alternatives: [
                    'https://images.unsplash.com/photo-1523986371872-9d3ba2e2a389?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&fit=crop&w=200&q=80',
                ],
            },
            {
                name: 'Pizza Places',
                image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                alternatives: [
                    'https://images.unsplash.com/photo-1548365328-9f547fb09530?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1548365327-5f8d2f3c9d2d?auto=format&fit=crop&w=200&q=80',
                ],
            },
            {
                name: 'Seafood',
                image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                alternatives: [
                    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1514517220030-7f3b2c2a8b22?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=200&q=80',
                    'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=200&q=80',
                ],
            },
        ],
        stores: {
            'Fine Dining': [
                {
                    name: 'Deluxe Restaurant',
                    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    rating: '4.1',
                    reviews: '84',
                    type: 'Restaurant, Fine Dining',
                    time: '15-25 min',
                    distance: '200m',
                    tag: '10% Discount',
                    tagColor: '',
                    openUntil: '22:00',
                    alternatives: [
                        'https://images.unsplash.com/photo-1528605105345-5344ea20e269?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1452968019206-08f18de4b3c7?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1484318571209-661cf29a69c3?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
            ],
            'Fast Food': [
                {
                    name: 'Quick Bites',
                    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    rating: '4.0',
                    reviews: '234',
                    type: 'Restaurant, Fast Food',
                    time: '5-10 min',
                    distance: '120m',
                    tag: '25% Discount',
                    tagColor: '',
                    openUntil: '24:00',
                    alternatives: [
                        'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
            ],
            'Ethnic Cuisine': [
                {
                    name: "Mama's Italian",
                    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    rating: '4.7',
                    reviews: '234',
                    type: 'Restaurant, Italian Cuisine',
                    time: '20-30 min',
                    distance: '450m',
                    tag: '15% Discount',
                    tagColor: '',
                    openUntil: '23:00',
                    alternatives: [
                        'https://images.unsplash.com/photo-1523986371872-9d3ba2e2a389?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
            ],
            'Pizza Places': [
                {
                    name: 'Pizza Corner',
                    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    rating: '4.4',
                    reviews: '167',
                    type: 'Restaurant, Pizza',
                    time: '12-18 min',
                    distance: '250m',
                    tag: '20% Discount',
                    tagColor: '',
                    openUntil: '24:00',
                    alternatives: [
                        'https://images.unsplash.com/photo-1548365328-9f547fb09530?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1548365327-5f8d2f3c9d2d?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
            ],
            Seafood: [
                {
                    name: "Ocean's Best Seafood",
                    image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    rating: '4.6',
                    reviews: '198',
                    type: 'Restaurant, Seafood',
                    time: '25-35 min',
                    distance: '600m',
                    tag: '18% Discount',
                    tagColor: '',
                    openUntil: '22:30',
                    alternatives: [
                        'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1514517220030-7f3b2c2a8b22?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
                        'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=80',
                    ],
                },
            ],
        },
    },
};
