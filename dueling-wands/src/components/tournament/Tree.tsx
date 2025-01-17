import React from 'react';
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

function convertToMatchFormat(tree: string): Record<string, Match[]> {
    const convertedData: Record<string, Match[]> = {};

    try {
        // Parse le JSON global
        const parsedTree = JSON.parse(tree) as Record<string, string[]>;

        Object.entries(parsedTree).forEach(([round, nodes]) => {
            convertedData[round] = nodes.map((nodeStr: string) => {
                try {
                    // Nettoyage des backslashes et parsing JSON
                    const cleanedNodeStr = nodeStr.replace(/\\/g, '');
                    const node = JSON.parse(cleanedNodeStr);
                    
                    // Construction d'un match
                    return {
                        players: node.userId.map((id: number) => `Player ${id}`),
                        winner: node.winners.length > 0 ? `Player ${node.winners[0]}` : null
                    };
                } catch (innerError) {
                    console.error("Erreur lors du parsing d'un nœud:", innerError);
                    return { players: [], winner: null };
                }
            });
        });
    } catch (error) {
        console.error("Erreur lors du parsing du tournoi:", error);
    }

    return convertedData;
}



export const Tree = (props: TreeProps) => {
    const tournamentData = convertToMatchFormat(props.tournamentData as unknown as string);
    console.log(tournamentData)
    
    if (!tournamentData || Object.keys(tournamentData).length === 0) {
        return <div className={styles.treeContainer}><p>No tournament data available</p></div>;
    }
    
    // Créer une liste de niveaux basée sur les clés de `tournamentData`
    const levels = Object.entries(tournamentData).map(([level, matches]) => ({
        level: parseInt(level),
        matches
    }));
    
    return (
        <div className={styles.treeContainer}>
            <h2>Tournament Tree</h2>
            {levels.map(({ level, matches }) => (
                <div key={level} className={styles.level}>
                    {matches.map((match, index) => (
                        <div key={`${level}-${index}`} className={styles.match}>
                            <div className={styles.players}>
                                {match.players.map((player, i) => (
                                    <div key={i} className={styles.player}>{player}</div>
                                ))}
                            </div>
                            <div className={styles.winner}>
                                <p>Winner:<br/>{match.winner || '-'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}    

//     return (
//         <div className={styles.treeContainer}>
//             <h2>Fight Preparation</h2>
//             {levels.map((matches, levelIndex) => (
//                 <div key={levelIndex} className={styles.level}>
//                     {matches.map((matchId) => {
//                         const match = tournamentData[parseInt(matchId)];
//                         return (
//                             <div key={matchId} className={styles.match}>
//                                 <div className={styles.players}>
//                                     {match.players.map((player, i) => (
//                                         <div key={i} className={styles.player}>{player}</div>
//                                     ))}
//                                 </div>
//                                 <div className={styles.winner}>
//                                     <p>Winner: {match.winner || '-'}</p>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             ))}
//         </div>
//     );
// };
export default Tree;