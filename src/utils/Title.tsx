
import { useEffect } from "react";
import type { TitlePageProps } from "../types/Title"

function TitlePage({ refPath }: TitlePageProps) {

    const newRefPath = refPath as string
    let title1 = newRefPath.split('/')[1]

    const title = document.title

    useEffect(() => {
        if(title1 === '') {
            title1 = 'Home'
        }
        document.title = title + ' | ' + title1
    }, [refPath])
}

export default TitlePage;