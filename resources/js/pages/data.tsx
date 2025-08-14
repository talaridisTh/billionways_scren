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

const workingImageIds = {
    restaurants: [
        '1517248135467-4c7edcad34c4', '1414235077428-338989a2e8c0', '1528605105345-5344ea20e269', '1504674900247-0877df9cc836',
        '1452968019206-08f18de4b3c7', '1484318571209-661cf29a69c3', '1498654896293-37aacf113fd9', '1533777324565-a040eb52fac1'
    ],
    cafes: [
        '1559925393-8be0ec4767c8', '1501339847302-ac426a4a7cbb', '1495474472287-4d71bcdd2085', '1447933601403-0c6688de566e',
        '1509043759401-136742328bb3', '1461988091159-192b6df7054f', '1512568400610-62da28bc8a13', '1481391032119-d89fee407e44'
    ],
    bars: [
        '1514933651103-005eec06c04b', '1470337458703-46ad1756a187', '1498654200943-1088dd4438ae', '1514361892635-6cfb51d3ed14',
        '1509401934319-c09cfd6a5b0b', '1514362545857-3bc16c4c76a1', '1544145945-f90425340c7e', '1532635046-26909d0d4b6a'
    ],
    bakeries: [
        '1509440159596-0249088772ff', '1512058564366-18510be2db19', '1499636136210-6f4ee915583e', '1564128442409-0b486d0598d7',
        '1519681393784-d120267933ba', '1519681398290-17f4407e5a88', '1475855581690-80accde3ae2b', '1542831371-d531d36971e6'
    ],
    foodTrucks: [
        '1565299624946-b28f40a0ca4b', '1550547660-d9450f859349', '1511690656952-34342bb7c2f2', '1515003197210-e0cd71810b5f',
        '1467003909585-2f8a72700288', '1504754524776-8f4f37790ca0', '1544025162-d76694265947', '1478145046317-39f10e56b5e9'
    ],
    desserts: [
        '1551024601-bec78aea704b', '1499636136210-6f4ee915583e', '1505250469679-203ad9ced0cb', '1541976076758-347942db1970',
        '1512058564366-18510be2db19', '1564128442409-0b486d0598d7', '1481391032119-d89fee407e44', '1519681398290-17f4407e5a88'
    ],
    hairSalons: [
        '1560066984-138dadb4c035', '1562322140-8baeececf3df', '1519751138087-5a3a3f54d76a', '1503951458645-643d53bfd60f',
        '1544716278-ca5e3f4abd8c', '1504196606672-aef5c9cefc92', '1520975922325-24baf30275c3', '1559599101-bc38c2b95b1b'
    ],
    nailStudios: [
        '1604654894611-6973b376cbde', '1512499617640-c2f999098c83', '1582095133179-bfd08e2fc6b3', '1511285560929-80b456fea0bc',
        '1512496015851-a90fb38ba796', '1522335789203-aabd1fc54bc9', '1516426122078-c23e76319801', '1512203492609-8f0f4b4a3f87'
    ],
    beautySpa: [
        '1570172619644-dfd03ed5d881', '1515378791036-0648a3ef77b2', '1556228724-4e447ef9b3f5', '1520975922325-24baf30275c3',
        '1540555700478-4be289fbecef', '1522335789203-aabd1fc54bc9', '1596462502278-27bfdc403348', '1512203492609-8f0f4b4a3f87'
    ],
    makeup: [
        '1522335789203-aabd1fc54bc9', '1512203492609-8f0f4b4a3f87', '1512496015851-a90fb38ba796', '1516426122078-c23e76319801',
        '1511285560929-80b456fea0bc', '1512499617640-c2f999098c83', '1582095133179-bfd08e2fc6b3', '1604654894611-6973b376cbde'
    ],
    skincare: [
        '1596462502278-27bfdc403348', '1515378791036-0648a3ef77b2', '1556228724-4e447ef9b3f5', '1512203492609-8f0f4b4a3f87',
        '1512496015851-a90fb38ba796', '1520975922325-24baf30275c3', '1540555700478-4be289fbecef', '1522335789203-aabd1fc54bc9'
    ],
    electricians: [
        '1581092918056-0c4c3acd3789', '1516116216624-53e697fedbea', '1518779578993-ec3579fee39f', '1517433456452-f9633a875f6f',
        '1519389950473-47ba0277781c', '1487058792275-0ad4aaf24ca7', '1518770660439-4636190af475', '1527864550417-7fd91fc51a46'
    ],
    techRepair: [
        '1527864550417-7fd91fc51a46', '1518773553398-650c184e0bb3', '1517336714731-489689fd1ca8', '1518770660439-4636190af475',
        '1487058792275-0ad4aaf24ca7', '1518779578993-ec3579fee39f', '1516116216624-53e697fedbea', '1581092918056-0c4c3acd3789'
    ],
    homeAutomation: [
        '1558618047-3c8c76ca7d13', '1498049794561-7780e7231661', '1505740420928-5e560c06d30e', '1487058792275-0ad4aaf24ca7',
        '1451187580459-43490279c0fa', '1484704849700-f032a568e944', '1518779578993-ec3579fee39f', '1516116216624-53e697fedbea'
    ],
    electronicsStore: [
        '1441986300917-64674bd600d8', '1511707171634-5f897ff02aa9', '1484704849700-f032a568e944', '1451187580459-43490279c0fa',
        '1515378791036-0648a3ef77b2', '1518779578993-ec3579fee39f', '1527864550417-7fd91fc51a46', '1517336714731-489689fd1ca8'
    ],
    solarPanels: [
        '1509391366360-2e959784a276', '1545205597-3d9d02c29597', '1556906781-9a412961c28c', '1509395176047-4a66953fd231',
        '1560958089-b8a1a3b61d8f', '1472214103695-fac79804c1f1', '1466781944567-f27e9750aac2', '1497440001374-93ce45943c90'
    ],
    fineDining: [
        '1517248135467-4c7edcad34c4', '1528605105345-5344ea20e269', '1504674900247-0877df9cc836', '1452968019206-08f18de4b3c7',
        '1484318571209-661cf29a69c3', '1498654896293-37aacf113fd9', '1533777324565-a040eb52fac1', '1527515637462-cff94eecc1ac'
    ],
    fastFood: [
        '1565299624946-b28f40a0ca4b', '1550547660-d9450f859349', '1511690656952-34342bb7c2f2', '1515003197210-e0cd71810b5f',
        '1504754524776-8f4f37790ca0', '1467003909585-2f8a72700288', '1544025162-d76694265947', '1478145046317-39f10e56b5e9'
    ],
    ethnicCuisine: [
        '1555939594-58d7cb561ad1', '1523986371872-9d3ba2e2a389', '1525755662778-989d0524087e', '1526318472351-c75fcf070305',
        '1504674900247-0877df9cc836', '1467003909585-2f8a72700288', '1514517220030-7f3b2c2a8b22', '1544025162-d76694265947'
    ],
    pizzaPlaces: [
        '1513104890138-7c749659a591', '1548365328-9f547fb09530', '1542281286-9e0a16bb7366', '1528137871618-79d2761e3fd5',
        '1548365327-5f8d2f3c9d2d', '1571091718767-18b5b1457add', '1504674900247-0877df9cc836', '1452968019206-08f18de4b3c7'
    ],
    seafood: [
        '1544943910-4c1dc44aab44', '1467003909585-2f8a72700288', '1514517220030-7f3b2c2a8b22', '1544025162-d76694265947',
        '1515003197210-e0cd71810b5f', '1504754524776-8f4f37790ca0', '1478145046317-39f10e56b5e9', '1571091718767-18b5b1457add'
    ]
};

const createStore = (name: string, imageIds: string[], index: number, rating: string, reviews: string, type: string, time: string, distance: string, tag: string, openUntil: string) => ({
    name,
    image: `https://images.unsplash.com/photo-${imageIds[index % imageIds.length]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80`,
    rating,
    reviews,
    type,
    time,
    distance,
    tag,
    tagColor: '',
    openUntil,
    alternatives: imageIds.slice(0, 4).map(id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1000&q=80`)
});

const createSubcategory = (name: string, imageIds: string[], index: number) => ({
    name,
    image: `https://images.unsplash.com/photo-${imageIds[index % imageIds.length]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80`,
    alternatives: imageIds.slice(0, 4).map(id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=200&q=80`)
});

export const mainCategories: Category[] = [
    {
        name: 'Gastronomy',
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        alternatives: ['1544025162-d76694265947', '1504754524776-8f4f37790ca0', '1478145046317-39f10e56b5e9', '1515003197210-e0cd71810b5f'].map(id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=200&q=80`)
    },
    {
        name: 'Cosmetics',
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        alternatives: ['1512203492609-8f0f4b4a3f87', '1512496015851-a90fb38ba796', '1556228724-4e447ef9b3f5', '1516426122078-c23e76319801'].map(id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=200&q=80`)
    },
    {
        name: 'Electrical',
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        alternatives: ['1516116216624-53e697fedbea', '1518779578993-ec3579fee39f', '1517433456452-f9633a875f6f', '1519389950473-47ba0277781c'].map(id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=200&q=80`)
    },
    {
        name: 'Restaurants',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        alternatives: ['1528605105345-5344ea20e269', '1504674900247-0877df9cc836', '1414235077428-338989a2e8c0', '1452968019206-08f18de4b3c7'].map(id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=200&q=80`)
    }
];

export const categoryData: Record<string, CategoryData> = {
    Gastronomy: {
        subcategories: [
            createSubcategory('Restaurants', workingImageIds.restaurants, 0),
            createSubcategory('Cafés', workingImageIds.cafes, 0),
            createSubcategory('Bars', workingImageIds.bars, 0),
            createSubcategory('Bakeries', workingImageIds.bakeries, 0),
            createSubcategory('Food Trucks', workingImageIds.foodTrucks, 0),
            createSubcategory('Desserts', workingImageIds.desserts, 0)
        ],
        stores: {
            Restaurants: [
                createStore('Deluxe Restaurant', workingImageIds.restaurants, 0, '4.1', '84', 'Gastronomy, Restaurant', '15-25 min', '200m', '10% Discount', '22:00'),
                createStore('Fine Dining Palace', workingImageIds.restaurants, 1, '4.7', '156', 'Gastronomy, Fine Dining', '20-30 min', '450m', '15% Discount', '23:00'),
                createStore('Modern Bistro', workingImageIds.restaurants, 2, '4.4', '92', 'Gastronomy, Modern Bistro', '18-28 min', '320m', '12% Discount', '23:30'),
                createStore('Garden Restaurant', workingImageIds.restaurants, 3, '4.3', '178', 'Gastronomy, Garden Dining', '22-32 min', '580m', '18% Discount', '22:30')
            ],
            Cafés: [
                createStore('Café Specialty', workingImageIds.cafes, 0, '4.8', '89', 'Gastronomy, Café', '5-15 min', '150m', '20% Discount', '23:00'),
                createStore('Coffee Corner', workingImageIds.cafes, 1, '4.5', '123', 'Gastronomy, Coffee Shop', '8-12 min', '100m', '25% Discount', '20:00'),
                createStore('Urban Coffee Lab', workingImageIds.cafes, 2, '4.6', '201', 'Gastronomy, Specialty Coffee', '10-18 min', '230m', '22% Discount', '21:00'),
                createStore('Artisan Café', workingImageIds.cafes, 3, '4.7', '167', 'Gastronomy, Artisan Café', '12-20 min', '290m', '28% Discount', '22:00')
            ],
            Bars: [
                createStore('Downtown Bistro', workingImageIds.bars, 0, '4.3', '156', 'Gastronomy, Bar & Restaurant', '10-20 min', '350m', '15% Discount', '01:00'),
                createStore('Cocktail Lounge', workingImageIds.bars, 1, '4.6', '234', 'Gastronomy, Cocktail Bar', '15-25 min', '280m', '20% Discount', '02:00'),
                createStore('Rooftop Bar', workingImageIds.bars, 2, '4.8', '189', 'Gastronomy, Rooftop Bar', '20-30 min', '420m', '25% Discount', '02:30'),
                createStore('Wine & Tapas Bar', workingImageIds.bars, 3, '4.5', '143', 'Gastronomy, Wine Bar', '18-28 min', '360m', '18% Discount', '01:30')
            ],
            Bakeries: [
                createStore('Fresh Bakery', workingImageIds.bakeries, 0, '4.6', '234', 'Gastronomy, Bakery', '8-12 min', '100m', '25% Discount', '19:00'),
                createStore('Artisan Bread Co.', workingImageIds.bakeries, 1, '4.8', '189', 'Gastronomy, Artisan Bakery', '12-18 min', '220m', '30% Discount', '18:00'),
                createStore('Golden Crust Bakery', workingImageIds.bakeries, 2, '4.4', '156', 'Gastronomy, Traditional Bakery', '10-16 min', '180m', '22% Discount', '20:00'),
                createStore('Morning Glory Bakehouse', workingImageIds.bakeries, 3, '4.7', '203', 'Gastronomy, French Bakery', '14-20 min', '260m', '28% Discount', '19:30')
            ],

            Desserts: [
                createStore('Sweet Dreams', workingImageIds.desserts, 0, '4.9', '145', 'Gastronomy, Dessert Shop', '10-15 min', '180m', '22% Discount', '21:00'),
                createStore('Chocolate Heaven', workingImageIds.desserts, 1, '4.7', '189', 'Gastronomy, Chocolate Shop', '12-18 min', '240m', '30% Discount', '20:30'),
                createStore('Ice Cream Palace', workingImageIds.desserts, 2, '4.8', '234', 'Gastronomy, Ice Cream Shop', '8-14 min', '160m', '25% Discount', '22:00'),
                createStore('Cake & More', workingImageIds.desserts, 3, '4.6', '167', 'Gastronomy, Cake Shop', '15-22 min', '300m', '20% Discount', '21:30')
            ]
        }
    },
    Cosmetics: {
        subcategories: [
            createSubcategory('Hair Salons', workingImageIds.hairSalons, 0),
            createSubcategory('Nail Studios', workingImageIds.nailStudios, 0),
            createSubcategory('Beauty Spa', workingImageIds.beautySpa, 0),
            createSubcategory('Makeup', workingImageIds.makeup, 0),
            createSubcategory('Skincare', workingImageIds.skincare, 0)
        ],
        stores: {
            'Hair Salons': [
                createStore('Stylish Hair Salon', workingImageIds.hairSalons, 0, '4.5', '156', 'Cosmetics, Hair Salon', '10-20 min', '350m', '20% Discount', '20:00'),
                createStore('Elite Hair Studio', workingImageIds.hairSalons, 1, '4.7', '203', 'Cosmetics, Premium Hair Salon', '15-30 min', '420m', '25% Discount', '21:00'),
                createStore('Modern Hair Design', workingImageIds.hairSalons, 2, '4.6', '178', 'Cosmetics, Modern Hair Salon', '12-25 min', '380m', '22% Discount', '20:30'),
                createStore('Creative Hair Lab', workingImageIds.hairSalons, 3, '4.8', '234', 'Cosmetics, Creative Hair Studio', '18-35 min', '510m', '30% Discount', '21:30')
            ],
            'Nail Studios': [
                createStore('Luxury Nail Studio', workingImageIds.nailStudios, 0, '4.7', '89', 'Cosmetics, Nail Art', '15-30 min', '280m', '30% Discount', '21:00'),
                createStore('Perfect Nails Spa', workingImageIds.nailStudios, 1, '4.5', '156', 'Cosmetics, Nail Spa', '20-35 min', '340m', '25% Discount', '20:00'),
                createStore('Artistic Nails', workingImageIds.nailStudios, 2, '4.8', '198', 'Cosmetics, Artistic Nail Design', '25-40 min', '450m', '35% Discount', '21:30'),
                createStore('Express Nails', workingImageIds.nailStudios, 3, '4.4', '123', 'Cosmetics, Quick Nail Service', '10-20 min', '200m', '20% Discount', '22:00')
            ],
            'Beauty Spa': [
                createStore('Beauty Spa Center', workingImageIds.beautySpa, 0, '4.8', '203', 'Cosmetics, Spa & Wellness', '20-35 min', '450m', '25% Discount', '22:00'),
                createStore('Serenity Spa', workingImageIds.beautySpa, 1, '4.9', '156', 'Cosmetics, Luxury Spa', '30-50 min', '680m', '30% Discount', '21:00'),
                createStore('Wellness Retreat Spa', workingImageIds.beautySpa, 2, '4.6', '189', 'Cosmetics, Wellness Spa', '25-40 min', '520m', '28% Discount', '21:30'),
                createStore('Urban Day Spa', workingImageIds.beautySpa, 3, '4.7', '234', 'Cosmetics, Urban Spa', '18-30 min', '390m', '22% Discount', '22:30')
            ],
            Makeup: [
                createStore('Makeup Studio Pro', workingImageIds.makeup, 0, '4.6', '127', 'Cosmetics, Makeup Artist', '25-40 min', '600m', '15% Discount', '19:00'),
                createStore('Glamour Makeup Lounge', workingImageIds.makeup, 1, '4.8', '189', 'Cosmetics, Glamour Makeup', '30-45 min', '720m', '20% Discount', '20:00'),
                createStore('Beauty Bar Makeup', workingImageIds.makeup, 2, '4.5', '145', 'Cosmetics, Beauty Bar', '20-35 min', '480m', '25% Discount', '21:00'),
                createStore('Professional Makeup Studio', workingImageIds.makeup, 3, '4.7', '203', 'Cosmetics, Professional Makeup', '35-50 min', '650m', '18% Discount', '18:30')
            ],
            Skincare: [
                createStore('Glow Skincare Clinic', workingImageIds.skincare, 0, '4.9', '156', 'Cosmetics, Skincare Specialist', '30-45 min', '520m', '20% Discount', '18:00'),
                createStore('Advanced Skincare Center', workingImageIds.skincare, 1, '4.8', '201', 'Cosmetics, Advanced Skincare', '40-60 min', '670m', '25% Discount', '19:00'),
                createStore('Natural Skincare Studio', workingImageIds.skincare, 2, '4.6', '167', 'Cosmetics, Natural Skincare', '25-40 min', '440m', '30% Discount', '20:00'),
                createStore('Derma Care Clinic', workingImageIds.skincare, 3, '4.7', '189', 'Cosmetics, Dermatology', '35-50 min', '590m', '15% Discount', '17:30')
            ]
        }
    },
    Electrical: {
        subcategories: [
            createSubcategory('Electricians', workingImageIds.electricians, 0),
            createSubcategory('Tech Repair', workingImageIds.techRepair, 0),
            createSubcategory('Home Automation', workingImageIds.homeAutomation, 0),
            createSubcategory('Electronics Store', workingImageIds.electronicsStore, 0),
            createSubcategory('Solar Panels', workingImageIds.solarPanels, 0)
        ],
        stores: {
            Electricians: [
                createStore('Expert Electricians', workingImageIds.electricians, 0, '4.2', '127', 'Electrical/Craftsmen, Electrician', '20-30 min', '500m', '15% Discount', '18:00'),
                createStore('Professional Electric Services', workingImageIds.electricians, 1, '4.5', '189', 'Electrical, Professional Electrician', '25-40 min', '650m', '20% Discount', '19:00'),
                createStore('Quick Fix Electrical', workingImageIds.electricians, 2, '4.3', '156', 'Electrical, Emergency Electrician', '15-25 min', '380m', '18% Discount', '20:00'),
                createStore('Master Electricians Co.', workingImageIds.electricians, 3, '4.6', '234', 'Electrical, Master Electrician', '30-45 min', '720m', '12% Discount', '17:30')
            ],
            'Tech Repair': [
                createStore('TechFix Repair Center', workingImageIds.techRepair, 0, '4.4', '89', 'Electrical, Tech Repair', '15-25 min', '300m', '20% Discount', '19:00'),
                createStore('Mobile Device Repair', workingImageIds.techRepair, 1, '4.6', '156', 'Electrical, Mobile Repair', '10-20 min', '250m', '25% Discount', '20:00'),
                createStore('Computer Solutions Hub', workingImageIds.techRepair, 2, '4.7', '203', 'Electrical, Computer Repair', '20-35 min', '420m', '15% Discount', '18:30'),
                createStore('Electronic Repair Pro', workingImageIds.techRepair, 3, '4.5', '178', 'Electrical, Electronics Repair', '25-40 min', '550m', '22% Discount', '19:30')
            ],
            'Electronics Store': [
                createStore('ElectroMart Store', workingImageIds.electronicsStore, 0, '4.3', '234', 'Electrical, Electronics Retail', '10-20 min', '400m', '25% Discount', '21:00'),
                createStore('TechWorld Electronics', workingImageIds.electronicsStore, 1, '4.5', '189', 'Electrical, Tech Retail', '12-22 min', '350m', '20% Discount', '20:30'),
                createStore('Digital Electronics Hub', workingImageIds.electronicsStore, 2, '4.6', '156', 'Electrical, Digital Store', '8-18 min', '280m', '30% Discount', '22:00'),
                createStore('Premium Electronics', workingImageIds.electronicsStore, 3, '4.7', '203', 'Electrical, Premium Electronics', '15-25 min', '480m', '15% Discount', '19:30')
            ],
            'Solar Panels': [
                createStore('Green Energy Solutions', workingImageIds.solarPanels, 0, '4.5', '98', 'Electrical, Solar Installation', '45-60 min', '800m', '12% Discount', '17:00'),
                createStore('Solar Power Experts', workingImageIds.solarPanels, 1, '4.7', '156', 'Electrical, Solar Specialists', '50-70 min', '920m', '15% Discount', '16:30'),
                createStore('Renewable Energy Co.', workingImageIds.solarPanels, 2, '4.6', '189', 'Electrical, Renewable Energy', '40-55 min', '750m', '18% Discount', '17:30'),
                createStore('EcoSolar Installations', workingImageIds.solarPanels, 3, '4.8', '234', 'Electrical, Eco Solar Systems', '60-80 min', '1100m', '10% Discount', '16:00')
            ]
        }
    },
    Restaurants: {
        subcategories: [
            createSubcategory('Fine Dining', workingImageIds.fineDining, 0),
            createSubcategory('Fast Food', workingImageIds.fastFood, 0),
            createSubcategory('Ethnic Cuisine', workingImageIds.ethnicCuisine, 0),
            createSubcategory('Pizza Places', workingImageIds.pizzaPlaces, 0),
            createSubcategory('Seafood', workingImageIds.seafood, 0)
        ],
        stores: {
            'Fine Dining': [
                createStore('Deluxe Restaurant', workingImageIds.fineDining, 0, '4.1', '84', 'Restaurant, Fine Dining', '15-25 min', '200m', '10% Discount', '22:00'),
                createStore('Michelin Star Dining', workingImageIds.fineDining, 1, '4.9', '189', 'Restaurant, Michelin Star', '25-35 min', '650m', '8% Discount', '23:00'),
                createStore('Elegant Gourmet', workingImageIds.fineDining, 2, '4.6', '156', 'Restaurant, Gourmet', '20-30 min', '420m', '12% Discount', '22:30'),
                createStore('Premium Culinary Experience', workingImageIds.fineDining, 3, '4.8', '234', 'Restaurant, Premium Dining', '30-40 min', '580m', '15% Discount', '23:30')
            ],

            'Ethnic Cuisine': [
                createStore("Mama's Italian", workingImageIds.ethnicCuisine, 0, '4.7', '234', 'Restaurant, Italian Cuisine', '20-30 min', '450m', '15% Discount', '23:00'),
                createStore('Dragon Palace Chinese', workingImageIds.ethnicCuisine, 1, '4.5', '189', 'Restaurant, Chinese Cuisine', '18-28 min', '380m', '20% Discount', '22:30'),
                createStore('Spice Garden Indian', workingImageIds.ethnicCuisine, 2, '4.6', '167', 'Restaurant, Indian Cuisine', '22-32 min', '520m', '18% Discount', '23:30'),
                createStore('Authentic Thai Kitchen', workingImageIds.ethnicCuisine, 3, '4.8', '201', 'Restaurant, Thai Cuisine', '25-35 min', '600m', '22% Discount', '22:00')
            ],
            'Pizza Places': [
                createStore('Pizza Corner', workingImageIds.pizzaPlaces, 0, '4.4', '167', 'Restaurant, Pizza', '12-18 min', '250m', '20% Discount', '24:00'),
                createStore('Artisan Pizza House', workingImageIds.pizzaPlaces, 1, '4.6', '189', 'Restaurant, Artisan Pizza', '15-22 min', '320m', '18% Discount', '23:00'),
                createStore('Wood Fired Pizza Co.', workingImageIds.pizzaPlaces, 2, '4.7', '156', 'Restaurant, Wood Fired Pizza', '18-25 min', '420m', '25% Discount', '22:30'),
                createStore('Neapolitan Pizza Palace', workingImageIds.pizzaPlaces, 3, '4.8', '234', 'Restaurant, Neapolitan Pizza', '20-28 min', '480m', '15% Discount', '23:30')
            ],
            Seafood: [
                createStore("Ocean's Best Seafood", workingImageIds.seafood, 0, '4.6', '198', 'Restaurant, Seafood', '25-35 min', '600m', '18% Discount', '22:30'),
                createStore('Fresh Catch Restaurant', workingImageIds.seafood, 1, '4.7', '156', 'Restaurant, Fresh Seafood', '22-32 min', '520m', '20% Discount', '23:00'),
                createStore('Mediterranean Seafood', workingImageIds.seafood, 2, '4.8', '189', 'Restaurant, Mediterranean Seafood', '28-38 min', '680m', '22% Discount', '22:00'),
                createStore('Coastal Grill & Seafood', workingImageIds.seafood, 3, '4.5', '234', 'Restaurant, Coastal Seafood', '30-40 min', '750m', '15% Discount', '21:30')
            ]
        }
    }
};
