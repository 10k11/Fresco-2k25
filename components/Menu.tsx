import React from 'react';
import AnimatedDiv from './AnimatedDiv';

const MenuItem: React.FC<{ category: string; items: string[] }> = ({ category, items }) => (
    <div>
        <h4 className="text-2xl font-bold text-emerald-400 font-orbitron tracking-wider border-b-2 border-emerald-500/50 pb-2 mb-4">{category}</h4>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    </div>
);

const Menu: React.FC = () => {
    const menu = {
        "Starters": ["Paneer Tikka", "Chilli Gobi", "Hara Bhara Kebab", "Crispy Corn"],
        "Main Course": ["Dal Makhani", "Shahi Paneer", "Veg Biryani", "Assorted Breads (Naan, Roti)"],
        "Live Counters": ["Pasta (Red/White Sauce)", "Tacos Station"],
        "Desserts": ["Chocolate Brownie", "Gulab Jamun", "Ice Cream Variety"],
        "Beverages": ["Exotic Mocktails", "Fresh Juices", "Soft Drinks"],
    };

    return (
            <section id="menu" className="py-20 bg-black">
            <AnimatedDiv threshold={0.2} className="text-center mb-12">
                <h2 className="text-4xl font-bold font-orbitron tracking-wide">Unlimited Buffet Lunch</h2>
                <p className="text-xl text-gray-400 mt-2">A feast for your senses awaits.</p>
            </AnimatedDiv>
            <AnimatedDiv threshold={0.1} delay={0.2}>
                    <div className="max-w-4xl mx-auto bg-black border border-gray-700 rounded-lg p-8 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <MenuItem category="Starters" items={menu.Starters} />
                        <MenuItem category="Main Course" items={menu['Main Course']} />
                        <MenuItem category="Live Counters" items={menu['Live Counters']} />
                        <MenuItem category="Desserts & Beverages" items={[...menu.Desserts, ...menu.Beverages]} />
                    </div>
                </div>
            </AnimatedDiv>
        </section>
    );
};

export default Menu;
