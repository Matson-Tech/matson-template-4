import { Heart } from "lucide-react";
import type React from "react";
import { useMemo } from "react";
import styles from "./Loading.module.css";

const HEART_COUNT = 12;
const DOT_COUNT = 3;

const Loading: React.FC = () => {
    // Generate random heart positions and timings once
    const hearts = useMemo(
        () =>
            Array.from({ length: HEART_COUNT }).map((_, idx) => ({
                key: idx,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                floatDuration: `${4 + Math.random() * 3}s`,
                floatDelay: `${Math.random() * 4}s`,
                beatDuration: `${2 + Math.random() * 2}s`,
                beatDelay: `${Math.random() * 2}s`,
                size: `${12 + Math.random() * 16}px`,
            })),
        [],
    );

    const dots = useMemo(
        () =>
            Array.from({ length: DOT_COUNT }).map((_, i) => ({
                key: i,
                delay: `${i * 0.2}s`,
            })),
        [],
    );

    return (
        <div className={styles.overlay}>
            <div className={styles.background}>
                {hearts.map(
                    ({
                        key,
                        left,
                        top,
                        floatDuration,
                        floatDelay,
                        beatDuration,
                        beatDelay,
                        size,
                    }) => (
                        <div
                            key={key}
                            className={styles.floatingHeart}
                            style={{
                                left,
                                top,
                                animationDelay: floatDelay,
                                animationDuration: floatDuration,
                            }}
                        >
                            <Heart
                                size={parseFloat(size)}
                                className={styles.heartIcon}
                                style={{
                                    animationDelay: beatDelay,
                                    animationDuration: beatDuration,
                                }}
                            />
                        </div>
                    ),
                )}
            </div>

            <div className={styles.content}>
                <div className={styles.mainHeartContainer}>
                    <Heart size={100} className={styles.pingHeart} />
                    <Heart size={90} className={styles.pulseHeart} />
                    <Heart size={80} className={styles.mainHeart} />
                    <div className={styles.sparkle1} />
                    <div className={styles.sparkle2} />
                    <div className={styles.sparkle3} />
                    <div className={styles.sparkle4} />
                </div>

                <div className={styles.textContainer}>
                    <h2 className={styles.loadingText}>Loading with Love</h2>
                    <div className={styles.dotsContainer}>
                        {dots.map(({ key, delay }) => (
                            <div
                                key={key}
                                className={styles.dot}
                                style={{ animationDelay: delay }}
                            />
                        ))}
                    </div>
                </div>

                <div className={styles.progressWrapper}>
                    <div className={styles.shimmer} />
                    <div className={styles.progressBar}>
                        <div className={styles.slideHighlight} />
                        <div className={styles.progressPulse} />
                    </div>
                </div>
            </div>

            <div className={styles.floatElem1} />
            <div className={styles.floatElem2} />
            <div className={styles.floatElem3} />
            <div className={styles.floatElem4} />
        </div>
    );
};

export default Loading;
