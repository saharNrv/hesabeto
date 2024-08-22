"use client";

import React, { useState } from "react";
import Modal from "../../components/module/modal/Modal";
import Topbar from "../../components/module/topbar/Topbar";
import style from "./Chart.module.css";
import { TiArrowUnsorted } from "react-icons/ti";
import { getMonthlyName, getPersianMonth } from "../../../lib/date";
import { apiGetMonthExpenses, apiPeriodTime } from "../../../api/expenses";
import { changeNumberStyle, setChartArrayMonthly } from "../../../lib/chart";
import { Legend } from "@headlessui/react";
import {
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryLine,
    VictoryTheme,
} from "victory";
import ExpensesDTO, { MonthlyDTO, RangeDTO } from "../../../types/expenses.dto";

const Chart = () => {
    // <--- State --->
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isMonthly, setIsMonthly] = useState<boolean>(true);
    const [showMonthModal, setShowMonthModal] = useState<boolean>(false);
    const [showStartMonthModal, setStartShowMonthModal] = useState<boolean>(false);
    const [showEndMonthModal, setEndShowMonthModal] = useState<boolean>(false);

    const [exp, setExp] = useState<ExpensesDTO[]>([]);

    const [monthly, setMonthly] = useState<MonthlyDTO>({
        month: getPersianMonth("m"),
        year: getPersianMonth("y"),
    });

    const [ranges, setRanges] = useState<RangeDTO>({
        startMonth: getPersianMonth("m"),
        startYear: getPersianMonth("y"),
        endMonth: getPersianMonth("m"),
        endYear: getPersianMonth("y"),
    });

    // <--- Handler --->
    const getReportHandler = () => {
        // we get monthly report and use monthly state
        if (isMonthly) {
            apiGetMonthExpenses(monthly.year, monthly.month).then((res) => {
                console.log(res);
                if (res.result !== null) {
                    setExp(res.result);
                }
            });
        } else {
            apiPeriodTime(
                ranges.startMonth,
                ranges.startYear,
                ranges.endMonth,
                ranges.endYear,
            ).then((res) => {
                console.log(res);
                if (res.result !== null) {
                    setExp(res.result);
                }
            });
        }
    };


    return (
        <section>
            <Topbar title="گزارشات" showBtn={true} />
            <div className={style.button_container}>
                <label>نوع گزارش</label>
                <button className={style.button} onClick={() => setShowModal(true)}>
                    <span>{isMonthly ? "گزارش ماهانه" : "گزارش بازه دلخواه"}</span>
                    <TiArrowUnsorted />
                </button>

                {isMonthly ? (
                    <>
                        <div className={style.choose_month}>
                            <label>انتخاب ماه</label>
                            <button
                                className={style.monthly_button}
                                onClick={() => setShowMonthModal(true)}>
                                <span>
                                    {monthly.month !== 0
                                        ? getMonthlyName(monthly.month)
                                        : getMonthlyName(getPersianMonth("m"))}
                                </span>
                                <span>
                                    {" "}
                                    {monthly.year !== 0 ? monthly.year : getPersianMonth("y")}
                                </span>
                            </button>
                        </div>
                    </>
                ) : (
                    <div className={style.range_container}>
                        <div className={style.choose_range}>
                            <label>شروع از</label>
                            <button
                                className={style.monthly_button}
                                onClick={() => setStartShowMonthModal(true)}>
                                {/* <span>
                                    {ranges.startMonth !== 0
                                        ? getMonthlyName(ranges.startMonth)
                                        : getMonthlyName(getPersianMonth("m"))}
                                </span> */}
                                <span>
                                    {" "}
                                    {ranges.startYear !== 0
                                        ? ranges.startYear
                                        : getPersianMonth("y")}
                                </span>
                            </button>
                        </div>
                        <div className={style.choose_range}>
                            <label>تا زمان</label>
                            <button
                                className={style.monthly_button}
                                onClick={() => setEndShowMonthModal(true)}>
                                {/* <span>
                                    {ranges.endMonth !== 0
                                        ? getMonthlyName(ranges.endMonth)
                                        : getMonthlyName(getPersianMonth("m"))}
                                </span> */}
                                <span>
                                    {" "}
                                    {ranges.endYear !== 0 ? ranges.endYear : getPersianMonth("y")}
                                </span>
                            </button>
                        </div>
                    </div>
                )}
                <button
                    className={`${style.button} ${style.button_report} ${style.btnMargin}`}
                    onClick={getReportHandler}
                >
                    دریافت گزارش
                </button>
            </div>


            <div className={style.chart_container}>
                {!!exp && exp.length > 0 && isMonthly && (
                    <>
                        <h4 className={style.chartTitle}>{isMonthly ? "گزارش ماهانه" : "گزارش بازه دلخواه"}</h4>
                        <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
                            <VictoryAxis
                                tickValues={setChartArrayMonthly(exp).map(
                                    (data, index) => index + 1,
                                )}
                                tickFormat={setChartArrayMonthly(exp).map((data) => data.key)}
                                style={{
                                    tickLabels: {
                                        angle: -45, // Rotate labels by 45 degrees counterclockwise
                                        fontSize: 10,
                                        padding: 15,
                                    },
                                }}
                            />
                            <VictoryAxis
                                dependentAxis
                                tickFormat={(x) => changeNumberStyle(x)}
                            />
                            <VictoryBar
                                data={setChartArrayMonthly(exp)}
                                x="key"
                                y="amount"
                                animate={{
                                    duration: 2000,
                                    onLoad: { duration: 1000 },
                                }}
                                style={{
                                    data: {
                                        fill: "#a8cde8",
                                        width: 20,
                                        //@ts-ignore
                                        cornerRadius: { top: 40 },
                                    }, // Set bar size and round the top corners
                                }}
                            />
                        </VictoryChart>
                    </>
                )}
                {exp.length > 0 && !isMonthly && (
                    <>
                        <h4>{isMonthly ? "گزارش ماهانه" : "گزارش بازه دلخواه"}</h4>
                        <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
                            <VictoryAxis
                                tickValues={setChartArrayMonthly(exp).map(
                                    (data, index) => index + 1,
                                )}
                                tickFormat={setChartArrayMonthly(exp).map((data) => data.key)}
                                style={{
                                    tickLabels: {
                                        angle: -45, // Rotate labels by 45 degrees counterclockwise
                                        fontSize: 10,
                                        padding: 15,
                                    },
                                }}
                            />
                            <VictoryAxis
                                dependentAxis
                                tickFormat={(x) => changeNumberStyle(x)}
                            />
                            <VictoryLine
                                data={setChartArrayMonthly(exp)}
                                x="key"
                                y="amount"
                                animate={{
                                    duration: 2000,
                                    onLoad: { duration: 1000 },
                                }}
                                style={{
                                    data: {
                                        stroke: "#a8cde8",
                                        width: 20,
                                        //@ts-ignore
                                        cornerRadius: { top: 40 },
                                    }, // Set bar size and round the top corners
                                }}
                            />
                        </VictoryChart>
                    </>
                )}
            </div>


            {/* this modal is for set reporting kind change between monthly or in custom range */}
            <Modal
                title="انتخاب گزارش"
                show={showModal}
                onClose={() => setShowModal(false)}>
                <button
                    className={style.button}
                    onClick={() => {
                        setIsMonthly(true);
                        setShowModal(false);
                        setExp([]);
                    }}>
                    گزارش ماهانه
                </button>
                <button
                    className={style.button}
                    onClick={() => {
                        setIsMonthly(false);
                        setShowModal(false);
                        setExp([]);
                    }}>
                    گزارش در بازه دلخواه
                </button>
            </Modal>

            {/* this modal is for choose month and year */}
            <Modal
                title="انتخاب ماه"
                show={showMonthModal}
                onClose={() => setShowMonthModal(false)}>
                <div className={style.selects_container}>
                    <select
                        onChange={(event) => {
                            setMonthly({
                                ...monthly,
                                month: +event.target.value,
                            });
                        }}
                        className={style.select}>
                        {[...Array.from({ length: 13 }, (j, i) => i++)].map((item) => (
                            <option key={item} value={item}>
                                {getMonthlyName(+item)}
                            </option>
                        ))}
                    </select>
                    <select
                        onChange={(event) => {
                            setMonthly({
                                ...monthly,
                                year: +event.target.value,
                            });
                        }}
                        className={style.select}>
                        <option value={getPersianMonth("y")}>
                            {getPersianMonth("y")}
                        </option>
                        <option value={getPersianMonth("y") + 1}>
                            {getPersianMonth("y") + 1}
                        </option>
                        <option value={getPersianMonth("y") + 2}>
                            {getPersianMonth("y") + 2}
                        </option>
                        <option value={getPersianMonth("y") + 3}>
                            {getPersianMonth("y") + 3}
                        </option>
                        <option value={getPersianMonth("y") + 4}>
                            {getPersianMonth("y") + 4}
                        </option>
                    </select>
                </div>
            </Modal>

            {/* this modal is for choose start month and year */}
            <Modal
                title="شروع از"
                show={showStartMonthModal}
                onClose={() => setStartShowMonthModal(false)}>
                <div className={style.selects_container}>
                    {/* <select
                        onChange={(event) => {
                            setRanges({
                                ...ranges,
                                startMonth: +event.target.value,
                            });
                        }}
                        className={style.select}>
                        {[...Array.from({ length: 13 }, (j, i) => i++)].map((item) => (
                            <option key={item} value={item}>
                                {getMonthlyName(+item)}
                            </option>
                        ))}
                    </select> */}
                    <input
                        maxLength={4}
                        placeholder="شروع از"
                        className={style.input}
                        type="text"
                        onChange={(event) =>
                            setRanges({
                                ...ranges,
                                startYear: +event.target.value,
                            })
                        }
                    />
                </div>
            </Modal>

            {/* this modal is for choose end month and year */}
            <Modal
                title="تا زمان"
                show={showEndMonthModal}
                onClose={() => setEndShowMonthModal(false)}>
                <div className={style.selects_container}>
                    {/* <select
                        onChange={(event) => {
                            setRanges({
                                ...ranges,
                                endMonth: +event.target.value,
                            });
                        }}
                        className={style.select}>
                        {[...Array.from({ length: 13 }, (j, i) => i++)].map((item) => (
                            <option key={item} value={item}>
                                {getMonthlyName(+item)}
                            </option>
                        ))}
                    </select> */}
                    <input
                        maxLength={4}
                        placeholder="تا زمان"
                        className={style.input}
                        type="text"
                        onChange={(event) =>
                            setRanges({
                                ...ranges,
                                endYear: +event.target.value,
                            })
                        }
                    />
                </div>
            </Modal>
        </section>
    );
}

export default Chart;
