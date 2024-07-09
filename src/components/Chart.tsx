import './Chart.css'
import { Item } from "../App";

import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';


interface ChartProps {
    list: any
}

const Chart: React.FC<ChartProps> = ({ list }) => {

    const month = new Date().getMonth() + 1

    const entrada = list?.filter((element: any) => element.type === 'entrada')
    const saida = list?.filter((element: any) => element.type === 'saída')

    const getEntrada = (e: number) => {
        let mes: number
        mes = month - e
        if (mes <= 0) mes = 12 - Math.abs(mes)
        const newList = entrada?.filter((element: Item) => (new Date(element.date).getUTCMonth() + 1) === mes)
        return newList.reduce((acc: number, att: Item) => acc + att.value, 0)
    }

    const getSaida = (e: number) => {
        let mes: number
        mes = month - e
        if (mes <= 0) mes = 12 - Math.abs(mes)
        const newList = saida?.filter((element: Item) => (new Date(element.date).getUTCMonth() + 1) === mes)
        return newList.reduce((acc: number, att: Item) => acc + att.value, 0)

    }

    const getMes = (e: number) => {
        if ((month - e) <= 0) return (12 - Math.abs(month - e)).toString().padStart(2, '0')
        else return (month - e).toString().padStart(2, '0')
    }

    const eData = [getEntrada(4), getEntrada(3), getEntrada(2), getEntrada(1), getEntrada(0)];
    const sData = [getSaida(4), getSaida(3), getSaida(2), getSaida(1), getSaida(0)];

    const xLabels = [
        getMes(4),
        getMes(3),
        getMes(2),
        getMes(1),
        month.toString().padStart(2, '0'),
    ]


    const [size, setSize] = useState<number>()

    useEffect(() => {
        if (innerWidth > 767) setSize(500)
        else setSize(370)
    }, [])

    return (
        <div className="chart">
            <LineChart width={size} height={300} series={[{ data: eData, label: 'Entrada' }, { data: sData, label: 'Saída' },]} xAxis={[{ scaleType: 'point', data: xLabels }]} />
        </div>
    )
}

export default Chart