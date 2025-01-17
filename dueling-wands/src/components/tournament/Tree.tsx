import React, { useMemo } from 'react';
import styles from './CSS/tree.module.css';
import { TournamentNode } from '../../pages/Tournament';

interface Match {
    players: string[];
    winner: string | null;
}

type TournamentTree = {
    [key: number]: Match;
};

interface TreeProps {
    tournamentData?: Map<number, TournamentNode[]>;
}

function convertToMatchFormat(tree: string): TournamentTree {
    const convertedData: TournamentTree = {};

    try {
        const parsedTree = JSON.parse(tree); // Désérialisation du premier niveau

        Object.entries(parsedTree).forEach(([round, nodes]) => {
            const parsedNodes = nodes.map((node: string) => JSON.parse(node)); // Deuxième désérialisation
            parsedNodes.forEach((node: any, index: number) => {
                convertedData[parseInt(round) * 100 + index] = {
                    players: node.userId.map((id: number) => `Player ${id}`),
                    winner: node.winners.length > 0 ? `Player ${node.winners[0]}` : null
                };
            });
        });
    } catch (error) {
        console.error("Erreur de parsing du tournoi:", error);
    }

    return convertedData;
}


export const Tree = (props: TreeProps) => {
    const tournamentData = convertToMatchFormat(props.tournamentData as unknown as string);

    if (!tournamentData) {
        return (<div className={styles.treeContainer}><p>No tournament data available</p></div>);
    }

    const levels: string[][] = [];

    // Construction des niveaux de l'arbre
    Object.entries(tournamentData).forEach(([matchId]) => {
        const level = Math.floor(Math.log2(parseInt(matchId) + 1));
        if (!levels[level]) levels[level] = [];
        levels[level].push(matchId);
    });

    return (
        <div className={styles.treeContainer}>
            <h2>Fight Preparation</h2>
            {levels.map((matches, levelIndex) => (
                <div key={levelIndex} className={styles.level}>
                    {matches.map((matchId) => {
                        const match = tournamentData[parseInt(matchId)];
                        return (
                            <div key={matchId} className={styles.match}>
                                <div className={styles.players}>
                                    {match.players.map((player, i) => (
                                        <div key={i} className={styles.player}>{player}</div>
                                    ))}
                                </div>
                                <div className={styles.winner}>
                                    <p>Winner: {match.winner || '-'}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};


export default Tree;
