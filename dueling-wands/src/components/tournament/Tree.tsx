import React from 'react';
import styles from './CSS/tree.module.css';

interface Match {
    players: string[];
    winner: string | null;
}

type TournamentTree = {
    [key: number]: Match;
};

interface TreeProps {
    tournamentData: TournamentTree;
}

export const Tree=({ tournamentData } : TreeProps) => {

    if (!tournamentData) {
        return (<div className={styles.treeContainer}><p>No tournament data available</p></div>);
    }

    const levels: string[][] = [];

    // Construction des niveaux de l'arbre
    Object.entries(tournamentData).forEach(([matchId, match]) => {
        const level = Math.floor(Math.log2(parseInt(matchId) + 1));
        if (!levels[level]) levels[level] = [];
        levels[level].push(matchId);
    });

    return (
        <div className={styles.treeContainer}>
            {levels.map((matches, levelIndex) => (
                <div key={levelIndex} className={styles.level}>
                    {matches.map((matchId, index) => {
                        const match = tournamentData[parseInt(matchId)];
                        return (
                            <div key={matchId} className={styles.match}>
                                <div className={styles.players}>
                                    {match.players.map((player, i) => (
                                        <div key={i} className={styles.player}>{player}</div>
                                    ))}
                                </div>
                                <div className={styles.winner}>
                                    <p>Winner<br/>{match.winner || '-'}</p>
                                </div>
                                {/* Connecteurs pyramidaux */}
                                {levelIndex < levels.length - 1 && (
                                    <>
                                        <div className={styles.connector}></div>
                                        {/* Ligne horizontale si deux duels côte à côte */}
                                        {index % 2 === 0 && (
                                            <div className={styles.connectorHorizontal}></div>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Tree;
