'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons"; 
import querystring from 'query-string';

interface CategoryCardProps {
    icon: IconType;
    label: string;
    selected?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({icon: Icon, label, selected}) => {
   
        const router = useRouter();
        const params = useSearchParams();

        // const handleClick = useCallback(() => {
        //     let currentQuery = {};

        //     if (params) {
        //         currentQuery = querystring.parse(params.toString());
        //     }

        //     const updateQuery: any = {
        //         ...currentQuery, 
        //         category: label
        //     }

        //     if (params?.get('category') === label) {
        //         delete updateQuery.category;
        //     }

        //     const url = querystring.stringifyUrl({
        //         url: '/',
        //         query: updateQuery},
        //         {skipNull: true
        //     });

        //     router.push(url);
        // }, [label, params, router]);
        
        const handleClick = () => {
            const query = querystring.stringify({ category: label });
            const url = `/maps?${query}`;
            router.push(url);
          };
          
        return (
            <div
            onClick={handleClick}
            className={`
            flex 
            flex-col 
            items-center 
            justify-center 
            gap-1
            p-1
            border-b-2 
            hover:text-custom-500 transition cursor-pointer 
            ${selected ? 'border-b-neutral-800' : 'border-transparent'} 
            ${selected ? 'text-neutral-800' : 'text-neutral-500'}`}
          >
            <Icon size={30} />
            <div className="font-medium text-sm">
              {label}
            </div>
          </div>
          );
          
}
 
export default CategoryCard;