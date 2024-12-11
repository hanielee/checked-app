import Container from "./Container";
import CategoryCard from "./CategoryCard";

import { IoRestaurantOutline, IoBagHandleOutline, IoLaptopOutline } from "react-icons/io5";
import { BiDrink, BiHotel, BiSpa, BiParty} from "react-icons/bi";
import { GiHiking, GiIsland, GiModernCity} from "react-icons/gi";

import { TbYoga } from "react-icons/tb";

export const categories = [
    {
        label: 'Restaurant',
        icon: IoRestaurantOutline,
    },
    {
        label: 'Bar',
        icon: BiDrink,
    },
    {
        label: 'Activity',
        icon: BiParty,
    },
    {
        label: 'Spa',
        icon: BiSpa,
    },
    {
        label: 'Yoga',
        icon: TbYoga,
    },
    {
        label: 'Hike',
        icon: GiHiking,
    },
    {
        label: 'Mall',
        icon: IoBagHandleOutline,
    },
    {
        label: 'Co-Working Space',
        icon: IoLaptopOutline,
    },
    {
        label: 'Island',
        icon: GiIsland,
    },
    {
        label: 'City',
        icon: GiModernCity,
    },
    {
        label: 'Hotel',
        icon: BiHotel,
    }
]

const Categories = () => {
    return ( 
    <Container>
    <div className="flex flex-row items-start justify-center h-screen">
        <div className="pt-4 pb-8 flex flex-row items-center justify-between gap-2 overflow-x-auto">
            <div className="grid grid-cols-4 gap-2">
                {categories.map((item) => (
                    <CategoryCard
                    key={item.label}
                    label={item.label}
                    icon={item.icon} 
                    />
                ))}
            </div>
        </div>
    </div>
    </Container> 
    );
}
 
export default Categories;