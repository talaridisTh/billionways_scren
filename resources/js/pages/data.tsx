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

const generateImageAlternatives = (baseId: string) => [
    `https://images.unsplash.com/photo-${baseId}?auto=format&fit=crop&w=1000&q=80`,
    `https://images.unsplash.com/photo-${baseId.slice(0,-1)}1?auto=format&fit=crop&w=1000&q=80`,
    `https://images.unsplash.com/photo-${baseId.slice(0,-1)}2?auto=format&fit=crop&w=1000&q=80`,
    `https://images.unsplash.com/photo-${baseId.slice(0,-1)}3?auto=format&fit=crop&w=1000&q=80`
];

const createStore = (name: string, imageId: string, rating: string, reviews: string, type: string, time: string, distance: string, tag: string, openUntil: string) => ({
    name,
    image: `https://images.unsplash.com/photo-${imageId}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80`,
    rating,
    reviews,
    type,
    time,
    distance,
    tag,
    tagColor: '',
    openUntil,
    alternatives: generateImageAlternatives(imageId)
});

const createSubcategory = (name: string, imageId: string) => ({
    name,
    image: `https://images.unsplash.com/photo-${imageId}?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80`,
    alternatives: [
        `https://images.unsplash.com/photo-${imageId.slice(0,-1)}1?auto=format&fit=crop&w=200&q=80`,
        `https://images.unsplash.com/photo-${imageId.slice(0,-1)}2?auto=format&fit=crop&w=200&q=80`,
        `https://images.unsplash.com/photo-${imageId.slice(0,-1)}3?auto=format&fit=crop&w=200&q=80`,
        `https://images.unsplash.com/photo-${imageId.slice(0,-1)}4?auto=format&fit=crop&w=200&q=80`
    ]
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
            createSubcategory('Restaurants', '1517248135467-4c7edcad34c4'),
            createSubcategory('Cafés', '1559925393-8be0ec4767c8'),
            createSubcategory('Bars', '1514933651103-005eec06c04b'),
            createSubcategory('Bakeries', '1509440159596-0249088772ff'),
            createSubcategory('Food Trucks', '1504754524776-8f4f37790ca0'),
            createSubcategory('Desserts', '1551024601-bec78aea704b')
        ],
        stores: {
            Restaurants: [
                createStore('Deluxe Restaurant', '1517248135467-4c7edcad34c4', '4.1', '84', 'Gastronomy, Restaurant', '15-25 min', '200m', '10% Discount', '22:00'),
                createStore('Fine Dining Palace', '1414235077428-338989a2e8c0', '4.7', '156', 'Gastronomy, Fine Dining', '20-30 min', '450m', '15% Discount', '23:00'),
                createStore('Modern Bistro', '1481833761820-0509d3217039', '4.4', '92', 'Gastronomy, Modern Bistro', '18-28 min', '320m', '12% Discount', '23:30'),
                createStore('Garden Restaurant', '1527515637462-cff94eecc1ac', '4.3', '178', 'Gastronomy, Garden Dining', '22-32 min', '580m', '18% Discount', '22:30')
            ],
            Cafés: [
                createStore('Café Specialty', '1559925393-8be0ec4767c8', '4.8', '89', 'Gastronomy, Café', '5-15 min', '150m', '20% Discount', '23:00'),
                createStore('Coffee Corner', '1501339847302-ac426a4a7cbb', '4.5', '123', 'Gastronomy, Coffee Shop', '8-12 min', '100m', '25% Discount', '20:00'),
                createStore('Urban Coffee Lab', '1517686469429-8bdb88b9f907', '4.6', '201', 'Gastronomy, Specialty Coffee', '10-18 min', '230m', '22% Discount', '21:00'),
                createStore('Artisan Café', '1447933601403-0c6688de566e', '4.7', '167', 'Gastronomy, Artisan Café', '12-20 min', '290m', '28% Discount', '22:00')
            ],
            Bars: [
                createStore('Downtown Bistro', '1514933651103-005eec06c04b', '4.3', '156', 'Gastronomy, Bar & Restaurant', '10-20 min', '350m', '15% Discount', '01:00'),
                createStore('Cocktail Lounge', '1470337458703-46ad1756a187', '4.6', '234', 'Gastronomy, Cocktail Bar', '15-25 min', '280m', '20% Discount', '02:00'),
                createStore('Rooftop Bar', '1509401934319-c09cfd6a5b0b', '4.8', '189', 'Gastronomy, Rooftop Bar', '20-30 min', '420m', '25% Discount', '02:30'),
                createStore('Wine & Tapas Bar', '1514361892635-6cfb51d3ed14', '4.5', '143', 'Gastronomy, Wine Bar', '18-28 min', '360m', '18% Discount', '01:30')
            ],
            Bakeries: [
                createStore('Fresh Bakery', '1509440159596-0249088772ff', '4.6', '234', 'Gastronomy, Bakery', '8-12 min', '100m', '25% Discount', '19:00'),
                createStore('Artisan Bread Co.', '1558961363-fa8fdf82db35', '4.8', '189', 'Gastronomy, Artisan Bakery', '12-18 min', '220m', '30% Discount', '18:00'),
                createStore('Golden Crust Bakery', '1519681393784-d120267933ba', '4.4', '156', 'Gastronomy, Traditional Bakery', '10-16 min', '180m', '22% Discount', '20:00'),
                createStore('Morning Glory Bakehouse', '1519681398290-17f4407e5a88', '4.7', '203', 'Gastronomy, French Bakery', '14-20 min', '260m', '28% Discount', '19:30')
            ],
            'Food Trucks': [
                createStore('Gourmet Street Food', '1565299624946-b28f40a0ca4b', '4.4', '67', 'Gastronomy, Food Truck', '5-10 min', '80m', '18% Discount', '22:00'),
                createStore('Urban Eats Truck', '1550547660-d9450f859349', '4.2', '89', 'Gastronomy, Mobile Kitchen', '3-8 min', '60m', '15% Discount', '21:00'),
                createStore('Fusion Street Kitchen', '1515003197210-e0cd71810b5f', '4.5', '124', 'Gastronomy, Fusion Food Truck', '7-12 min', '95m', '20% Discount', '23:00'),
                createStore('Artisan Food Wagon', '1511690656952-34342bb7c2f2', '4.6', '78', 'Gastronomy, Artisan Food Truck', '8-15 min', '110m', '25% Discount', '22:30')
            ],
            Desserts: [
                createStore('Sweet Dreams', '1551024601-bec78aea704b', '4.9', '145', 'Gastronomy, Dessert Shop', '10-15 min', '180m', '22% Discount', '21:00'),
                createStore('Chocolate Heaven', '1499636136210-6f4ee915583e', '4.7', '189', 'Gastronomy, Chocolate Shop', '12-18 min', '240m', '30% Discount', '20:30'),
                createStore('Ice Cream Palace', '1505250469679-203ad9ced0cb', '4.8', '234', 'Gastronomy, Ice Cream Shop', '8-14 min', '160m', '25% Discount', '22:00'),
                createStore('Cake & More', '1541976076758-347942db1970', '4.6', '167', 'Gastronomy, Cake Shop', '15-22 min', '300m', '20% Discount', '21:30')
            ]
        }
    },
    Cosmetics: {
        subcategories: [
            createSubcategory('Hair Salons', '1560066984-138dadb4c035'),
            createSubcategory('Nail Studios', '1604654894611-6973b376cbde'),
            createSubcategory('Beauty Spa', '1570172619644-dfd03ed5d881'),
            createSubcategory('Makeup', '1522335789203-aabd1fc54bc9'),
            createSubcategory('Skincare', '1596462502278-27bfdc403348')
        ],
        stores: {
            'Hair Salons': [
                createStore('Stylish Hair Salon', '1560066984-138dadb4c035', '4.5', '156', 'Cosmetics, Hair Salon', '10-20 min', '350m', '20% Discount', '20:00'),
                createStore('Elite Hair Studio', '1562322140-8baeececf3df', '4.7', '203', 'Cosmetics, Premium Hair Salon', '15-30 min', '420m', '25% Discount', '21:00'),
                createStore('Modern Hair Design', '1519751138087-5a3a3f54d76a', '4.6', '178', 'Cosmetics, Modern Hair Salon', '12-25 min', '380m', '22% Discount', '20:30'),
                createStore('Creative Hair Lab', '1503951458645-643d53bfd60f', '4.8', '234', 'Cosmetics, Creative Hair Studio', '18-35 min', '510m', '30% Discount', '21:30')
            ],
            'Nail Studios': [
                createStore('Luxury Nail Studio', '1604654894611-6973b376cbde', '4.7', '89', 'Cosmetics, Nail Art', '15-30 min', '280m', '30% Discount', '21:00'),
                createStore('Perfect Nails Spa', '1512499617640-c2f999098c83', '4.5', '156', 'Cosmetics, Nail Spa', '20-35 min', '340m', '25% Discount', '20:00'),
                createStore('Artistic Nails', '1582095133179-bfd08e2fc6b3', '4.8', '198', 'Cosmetics, Artistic Nail Design', '25-40 min', '450m', '35% Discount', '21:30'),
                createStore('Express Nails', '1511285560929-80b456fea0bc', '4.4', '123', 'Cosmetics, Quick Nail Service', '10-20 min', '200m', '20% Discount', '22:00')
            ],
            'Beauty Spa': [
                createStore('Beauty Spa Center', '1570172619644-dfd03ed5d881', '4.8', '203', 'Cosmetics, Spa & Wellness', '20-35 min', '450m', '25% Discount', '22:00'),
                createStore('Serenity Spa', '1515378791036-0648a3ef77b2', '4.9', '156', 'Cosmetics, Luxury Spa', '30-50 min', '680m', '30% Discount', '21:00'),
                createStore('Wellness Retreat Spa', '1556228724-4e447ef9b3f5', '4.6', '189', 'Cosmetics, Wellness Spa', '25-40 min', '520m', '28% Discount', '21:30'),
                createStore('Urban Day Spa', '1520975922325-24baf30275c3', '4.7', '234', 'Cosmetics, Urban Spa', '18-30 min', '390m', '22% Discount', '22:30')
            ],
            Makeup: [
                createStore('Makeup Studio Pro', '1522335789203-aabd1fc54bc9', '4.6', '127', 'Cosmetics, Makeup Artist', '25-40 min', '600m', '15% Discount', '19:00'),
                createStore('Glamour Makeup Lounge', '1512203492609-8f0f4b4a3f87', '4.8', '189', 'Cosmetics, Glamour Makeup', '30-45 min', '720m', '20% Discount', '20:00'),
                createStore('Beauty Bar Makeup', '1512496015851-a90fb38ba796', '4.5', '145', 'Cosmetics, Beauty Bar', '20-35 min', '480m', '25% Discount', '21:00'),
                createStore('Professional Makeup Studio', '1516426122078-c23e76319801', '4.7', '203', 'Cosmetics, Professional Makeup', '35-50 min', '650m', '18% Discount', '18:30')
            ],
            Skincare: [
                createStore('Glow Skincare Clinic', '1596462502278-27bfdc403348', '4.9', '156', 'Cosmetics, Skincare Specialist', '30-45 min', '520m', '20% Discount', '18:00'),
                createStore('Advanced Skincare Center', '1515378791036-0648a3ef77b2', '4.8', '201', 'Cosmetics, Advanced Skincare', '40-60 min', '670m', '25% Discount', '19:00'),
                createStore('Natural Skincare Studio', '1556228724-4e447ef9b3f5', '4.6', '167', 'Cosmetics, Natural Skincare', '25-40 min', '440m', '30% Discount', '20:00'),
                createStore('Derma Care Clinic', '1512203492609-8f0f4b4a3f87', '4.7', '189', 'Cosmetics, Dermatology', '35-50 min', '590m', '15% Discount', '17:30')
            ]
        }
    },
    Electrical: {
        subcategories: [
            createSubcategory('Electricians', '1581092918056-0c4c3acd3789'),
            createSubcategory('Tech Repair', '1527864550417-7fd91fc51a46'),
            createSubcategory('Home Automation', '1505740420928-5e560c06d30e'),
            createSubcategory('Electronics Store', '1441986300917-64674bd600d8'),
            createSubcategory('Solar Panels', '1509391366360-2e959784a276')
        ],
        stores: {
            Electricians: [
                createStore('Expert Electricians', '1581092918056-0c4c3acd3789', '4.2', '127', 'Electrical/Craftsmen, Electrician', '20-30 min', '500m', '15% Discount', '18:00'),
                createStore('Professional Electric Services', '1516116216624-53e697fedbea', '4.5', '189', 'Electrical, Professional Electrician', '25-40 min', '650m', '20% Discount', '19:00'),
                createStore('Quick Fix Electrical', '1518779578993-ec3579fee39f', '4.3', '156', 'Electrical, Emergency Electrician', '15-25 min', '380m', '18% Discount', '20:00'),
                createStore('Master Electricians Co.', '1517433456452-f9633a875f6f', '4.6', '234', 'Electrical, Master Electrician', '30-45 min', '720m', '12% Discount', '17:30')
            ],
            'Tech Repair': [
                createStore('TechFix Repair Center', '1527864550417-7fd91fc51a46', '4.4', '89', 'Electrical, Tech Repair', '15-25 min', '300m', '20% Discount', '19:00'),
                createStore('Mobile Device Repair', '1518773553398-650c184e0bb3', '4.6', '156', 'Electrical, Mobile Repair', '10-20 min', '250m', '25% Discount', '20:00'),
                createStore('Computer Solutions Hub', '1517336714731-489689fd1ca8', '4.7', '203', 'Electrical, Computer Repair', '20-35 min', '420m', '15% Discount', '18:30'),
                createStore('Electronic Repair Pro', '1518770660439-4636190af475', '4.5', '178', 'Electrical, Electronics Repair', '25-40 min', '550m', '22% Discount', '19:30')
            ],
            'Home Automation': [
                createStore('Smart Home Solutions', '1558618047-3c8c76ca7d13', '4.6', '156', 'Electrical, Home Automation', '30-45 min', '750m', '10% Discount', '17:00'),
                createStore('Future Home Tech', '1498049794561-7780e7231661', '4.8', '189', 'Electrical, Smart Technology', '35-50 min', '820m', '15% Discount', '18:00'),
                createStore('Automated Living Systems', '1505740420928-5e560c06d30e', '4.7', '234', 'Electrical, Living Automation', '40-60 min', '900m', '12% Discount', '16:30'),
                createStore('IoT Integration Experts', '1487058792275-0ad4aaf24ca7', '4.5', '167', 'Electrical, IoT Solutions', '25-40 min', '680m', '18% Discount', '17:30')
            ],
            'Electronics Store': [
                createStore('ElectroMart Store', '1441986300917-64674bd600d8', '4.3', '234', 'Electrical, Electronics Retail', '10-20 min', '400m', '25% Discount', '21:00'),
                createStore('TechWorld Electronics', '1511707171634-5f897ff02aa9', '4.5', '189', 'Electrical, Tech Retail', '12-22 min', '350m', '20% Discount', '20:30'),
                createStore('Digital Electronics Hub', '1484704849700-f032a568e944', '4.6', '156', 'Electrical, Digital Store', '8-18 min', '280m', '30% Discount', '22:00'),
                createStore('Premium Electronics', '1451187580459-43490279c0fa', '4.7', '203', 'Electrical, Premium Electronics', '15-25 min', '480m', '15% Discount', '19:30')
            ],
            'Solar Panels': [
                createStore('Green Energy Solutions', '1509391366360-2e959784a276', '4.5', '98', 'Electrical, Solar Installation', '45-60 min', '800m', '12% Discount', '17:00'),
                createStore('Solar Power Experts', '1545205597-3d9d02c29597', '4.7', '156', 'Electrical, Solar Specialists', '50-70 min', '920m', '15% Discount', '16:30'),
                createStore('Renewable Energy Co.', '1556906781-9a412961c28c', '4.6', '189', 'Electrical, Renewable Energy', '40-55 min', '750m', '18% Discount', '17:30'),
                createStore('EcoSolar Installations', '1509395176047-4a66953fd231', '4.8', '234', 'Electrical, Eco Solar Systems', '60-80 min', '1100m', '10% Discount', '16:00')
            ]
        }
    },
    Restaurants: {
        subcategories: [
            createSubcategory('Fine Dining', '1517248135467-4c7edcad34c4'),
            createSubcategory('Fast Food', '1550547660-d9450f859349'),
            createSubcategory('Ethnic Cuisine', '1555939594-58d7cb561ad1'),
            createSubcategory('Pizza Places', '1513104890138-7c749659a591'),
            createSubcategory('Seafood', '1544943910-4c1dc44aab44')
        ],
        stores: {
            'Fine Dining': [
                createStore('Deluxe Restaurant', '1517248135467-4c7edcad34c4', '4.1', '84', 'Restaurant, Fine Dining', '15-25 min', '200m', '10% Discount', '22:00'),
                createStore('Michelin Star Dining', '1528605105345-5344ea20e269', '4.9', '189', 'Restaurant, Michelin Star', '25-35 min', '650m', '8% Discount', '23:00'),
                createStore('Elegant Gourmet', '1504674900247-0877df9cc836', '4.6', '156', 'Restaurant, Gourmet', '20-30 min', '420m', '12% Discount', '22:30'),
                createStore('Premium Culinary Experience', '1452968019206-08f18de4b3c7', '4.8', '234', 'Restaurant, Premium Dining', '30-40 min', '580m', '15% Discount', '23:30')
            ],
            'Fast Food': [
                createStore('Quick Bites', '1565299624946-b28f40a0ca4b', '4.0', '234', 'Restaurant, Fast Food', '5-10 min', '120m', '25% Discount', '24:00'),
                createStore('Speed Burger', '1550547660-d9450f859349', '4.2', '189', 'Restaurant, Burger Joint', '3-8 min', '80m', '30% Discount', '01:00'),
                createStore('Express Grill', '1511690656952-34342bb7c2f2', '4.3', '156', 'Restaurant, Grill Express', '7-12 min', '150m', '22% Discount', '23:30'),
                createStore('Fast & Fresh', '1515003197210-e0cd71810b5f', '4.4', '203', 'Restaurant, Fresh Fast Food', '8-15 min', '200m', '20% Discount', '22:00')
            ],
            'Ethnic Cuisine': [
                createStore("Mama's Italian", '1555939594-58d7cb561ad1', '4.7', '234', 'Restaurant, Italian Cuisine', '20-30 min', '450m', '15% Discount', '23:00'),
                createStore('Dragon Palace Chinese', '1523986371872-9d3ba2e2a389', '4.5', '189', 'Restaurant, Chinese Cuisine', '18-28 min', '380m', '20% Discount', '22:30'),
                createStore('Spice Garden Indian', '1525755662778-989d0524087e', '4.6', '167', 'Restaurant, Indian Cuisine', '22-32 min', '520m', '18% Discount', '23:30'),
                createStore('Authentic Thai Kitchen', '1526318472351-c75fcf070305', '4.8', '201', 'Restaurant, Thai Cuisine', '25-35 min', '600m', '22% Discount', '22:00')
            ],
            'Pizza Places': [
                createStore('Pizza Corner', '1513104890138-7c749659a591', '4.4', '167', 'Restaurant, Pizza', '12-18 min', '250m', '20% Discount', '24:00'),
                createStore('Artisan Pizza House', '1548365328-9f547fb09530', '4.6', '189', 'Restaurant, Artisan Pizza', '15-22 min', '320m', '18% Discount', '23:00'),
                createStore('Wood Fired Pizza Co.', '1542281286-9e0a16bb7366', '4.7', '156', 'Restaurant, Wood Fired Pizza', '18-25 min', '420m', '25% Discount', '22:30'),
                createStore('Neapolitan Pizza Palace', '1528137871618-79d2761e3fd5', '4.8', '234', 'Restaurant, Neapolitan Pizza', '20-28 min', '480m', '15% Discount', '23:30')
            ],
            Seafood: [
                createStore("Ocean's Best Seafood", '1544943910-4c1dc44aab44', '4.6', '198', 'Restaurant, Seafood', '25-35 min', '600m', '18% Discount', '22:30'),
                createStore('Fresh Catch Restaurant', '1467003909585-2f8a72700288', '4.7', '156', 'Restaurant, Fresh Seafood', '22-32 min', '520m', '20% Discount', '23:00'),
                createStore('Mediterranean Seafood', '1514517220030-7f3b2c2a8b22', '4.8', '189', 'Restaurant, Mediterranean Seafood', '28-38 min', '680m', '22% Discount', '22:00'),
                createStore('Coastal Grill & Seafood', '1544025162-d76694265947', '4.5', '234', 'Restaurant, Coastal Seafood', '30-40 min', '750m', '15% Discount', '21:30')
            ]
        }
    }
};
