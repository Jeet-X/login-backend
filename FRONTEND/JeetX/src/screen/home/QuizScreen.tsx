import * as React from "react";
import { ScrollView, StyleSheet, View, Text, Image as RNImage, Pressable } from "react-native";

const Image = (props: any) => <View {...props} style={[{ backgroundColor: 'rgba(255,255,255,0.1)' }, props.style]} ><RNImage {...props} style={{ display: 'none' }} /></View>;
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const QuizScreen = ({ navigation }: any) => {

    return (
        <SafeAreaView style={styles.viewBg}>
            <View style={{ flex: 1 }}>
            <View style={[styles.view, styles.viewLayout]}>
                <View style={styles.mainBody}>
                    <ScrollView style={[styles.contentBody, styles.chessListLayout]}>
                        <View style={[styles.mathQuizParent, styles.body1Position]}>
                            <View style={[styles.mathQuiz, styles.mathLayout]}>
                                <View style={[styles.mathQuizChild, styles.categoriesBg]} />
                                <Text style={[styles.mathsQuiz, styles.quizzesFlexBox]}>Maths Quiz</Text>
                                <Text style={[styles.challengeYourReasoning, styles.yourTypo]}>Challenge your reasoning and quick thinking with our math quiz questions.</Text>
                                <View style={[styles.chatgptImageJul13202503Parent, styles.chatgptParentLayout]}>
                                    <View style={[styles.chatgptImageJul13202503, styles.chatgptParentLayout]} />
                                    <Image style={styles.chatgptImageJul16202502} resizeMode="cover" />
                                </View>
                                <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                                <Image style={[styles.arrowUpRightUndefinedG, styles.arrowLayout]} resizeMode="cover" />
                                <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                    <View style={[styles.frameChild, styles.frameChildLayout]} />
                                    <View style={styles.frameChildPosition1} />
                                    <View style={styles.frameChildPosition} />
                                    <Text style={[styles.getIn, styles.amTypo1]}>Get IN</Text>
                                </View>
                            </View>
                            <View style={[styles.mathQuiz, styles.mathLayout]}>
                                <View style={[styles.mathQuizChild, styles.categoriesBg]} />
                                <Text style={[styles.mathsQuiz, styles.quizzesFlexBox]}>Sports Quiz</Text>
                                <Text style={[styles.challengeYourReasoning, styles.yourTypo]}>Challenge your knowledge and agility with our Sports Quiz!</Text>
                                <View style={[styles.chatgptImageJul13202503Parent, styles.chatgptParentLayout]}>
                                    <View style={[styles.chatgptImageJul13202503, styles.chatgptParentLayout]} />
                                </View>
                                <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                                <Image style={[styles.arrowUpRightUndefinedG, styles.arrowLayout]} resizeMode="cover" />
                                <Image style={styles.chatgptPosition} resizeMode="cover" />
                                <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                    <View style={[styles.frameChild, styles.frameChildLayout]} />
                                    <View style={styles.frameChildPosition1} />
                                    <View style={styles.frameChildPosition} />
                                    <Text style={[styles.getIn, styles.amTypo1]}>Get IN</Text>
                                </View>
                            </View>
                            <View style={[styles.mathQuiz, styles.mathLayout]}>
                                <View style={[styles.mathQuizChild, styles.categoriesBg]} />
                                <Text style={[styles.mathsQuiz, styles.quizzesFlexBox]}>Entertainment Quiz</Text>
                                <Text style={[styles.challengeYourReasoning, styles.yourTypo]}>Put your brain to the test with exciting and entertaining challenges!</Text>
                                <View style={[styles.chatgptImageJul13202503Parent, styles.chatgptParentLayout]}>
                                    <View style={[styles.chatgptImageJul13202503, styles.chatgptParentLayout]} />
                                </View>
                                <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                                <Image style={[styles.arrowUpRightUndefinedG, styles.arrowLayout]} resizeMode="cover" />
                                <Image style={[styles.chatgptImageJul162025023, styles.chatgptImageJul162025023Layout]} resizeMode="cover" />
                                <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                    <View style={[styles.frameChild, styles.frameChildLayout]} />
                                    <View style={styles.frameChildPosition1} />
                                    <View style={styles.frameChildPosition} />
                                    <Text style={[styles.getIn, styles.amTypo1]}>Get IN</Text>
                                </View>
                            </View>
                            <View style={[styles.mathQuiz, styles.mathLayout]}>
                                <View style={[styles.mathQuizChild, styles.categoriesBg]} />
                                <Text style={[styles.mathsQuiz, styles.quizzesFlexBox]}>Music Quiz</Text>
                                <Text style={[styles.challengeYourReasoning, styles.yourTypo]}>{`Test your logic and speed with  math's Questions. `}</Text>
                                <View style={[styles.chatgptImageJul13202503Parent, styles.chatgptParentLayout]}>
                                    <View style={[styles.chatgptImageJul13202503, styles.chatgptParentLayout]} />
                                    <Image style={[styles.musicFlatIconForMusicQuiz, styles.gameLayout]} resizeMode="cover" />
                                </View>
                                <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                                <Image style={[styles.arrowUpRightUndefinedG, styles.arrowLayout]} resizeMode="cover" />
                                <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                    <View style={[styles.frameChild, styles.frameChildLayout]} />
                                    <View style={styles.frameChildPosition1} />
                                    <View style={styles.frameChildPosition} />
                                    <Text style={[styles.getIn, styles.amTypo1]}>Get IN</Text>
                                </View>
                            </View>
                            <View style={[styles.mathQuiz, styles.mathLayout]}>
                                <View style={[styles.mathQuizChild, styles.categoriesBg]} />
                                <Text style={[styles.mathsQuiz, styles.quizzesFlexBox]}>Political Knowledge Quiz</Text>
                                <Text style={[styles.challengeYourReasoning, styles.yourTypo]}>Challenge your intellect and agility with our captivating Political Quiz!</Text>
                                <View style={[styles.chatgptImageJul13202503Parent, styles.chatgptParentLayout]}>
                                    <View style={[styles.chatgptImageJul13202503, styles.chatgptParentLayout]} />
                                    <Image style={[styles.politicsFlatColoredIcon, styles.flatPosition]} resizeMode="cover" />
                                </View>
                                <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                                <Image style={[styles.arrowUpRightUndefinedG, styles.arrowLayout]} resizeMode="cover" />
                                <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                    <View style={[styles.frameChild, styles.frameChildLayout]} />
                                    <View style={styles.frameChildPosition1} />
                                    <View style={styles.frameChildPosition} />
                                    <Text style={[styles.getIn, styles.amTypo1]}>Get IN</Text>
                                </View>
                            </View>
                            <View style={[styles.mathQuiz, styles.mathLayout]}>
                                <View style={[styles.mathQuizChild, styles.categoriesBg]} />
                                <Text style={[styles.mathsQuiz, styles.quizzesFlexBox]}>IQ Test</Text>
                                <Text style={[styles.challengeYourReasoning, styles.yourTypo]}>Challenge your intellect and agility with our captivating Political Quiz!</Text>
                                <View style={[styles.chatgptImageJul13202503Parent, styles.chatgptParentLayout]}>
                                    <View style={[styles.chatgptImageJul13202503Parent2, styles.chatgptParentLayout]}>
                                        <View style={[styles.chatgptImageJul13202503, styles.chatgptParentLayout]} />
                                        <Image style={[styles.createAFlatIllustrationFor, styles.flatPosition]} resizeMode="cover" />
                                    </View>
                                </View>
                                <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                                <Image style={[styles.arrowUpRightUndefinedG, styles.arrowLayout]} resizeMode="cover" />
                                <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                    <View style={[styles.frameChild, styles.frameChildLayout]} />
                                    <View style={styles.frameChildPosition1} />
                                    <View style={styles.frameChildPosition} />
                                    <Text style={[styles.getIn, styles.amTypo1]}>Get IN</Text>
                                </View>
                            </View>
                            <View style={[styles.mathQuiz, styles.mathLayout]}>
                                <View style={[styles.mathQuizChild, styles.categoriesBg]} />
                                <Text style={[styles.mathsQuiz, styles.quizzesFlexBox]}>GK Test</Text>
                                <Text style={[styles.challengeYourReasoning, styles.yourTypo]}>Challenge your intellect and agility with our captivating Political Quiz!</Text>
                                <View style={[styles.chatgptImageJul13202503Parent, styles.chatgptParentLayout]}>
                                    <View style={[styles.chatgptImageJul13202503, styles.chatgptParentLayout]} />
                                    <Image style={[styles.politicsFlatColoredIcon, styles.flatPosition]} resizeMode="cover" />
                                </View>
                                <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                                <Image style={[styles.arrowUpRightUndefinedG, styles.arrowLayout]} resizeMode="cover" />
                                <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                    <View style={[styles.frameChild, styles.frameChildLayout]} />
                                    <View style={styles.frameChildPosition1} />
                                    <View style={styles.frameChildPosition} />
                                    <Text style={[styles.getIn, styles.amTypo1]}>Get IN</Text>
                                </View>
                            </View>
                            <View style={[styles.mathQuiz, styles.mathLayout]}>
                                <View style={[styles.mathQuizChild, styles.categoriesBg]} />
                                <Text style={[styles.mathsQuiz, styles.quizzesFlexBox]}>{`Computer & Programming`}</Text>
                                <Text style={[styles.challengeYourReasoning, styles.yourTypo]}>Challenge your intellect and agility with our captivating Political Quiz!</Text>
                                <View style={[styles.chatgptImageJul13202503Parent, styles.chatgptParentLayout]}>
                                    <View style={[styles.chatgptImageJul13202503, styles.chatgptParentLayout]} />
                                    <Image style={[styles.createAProgrammingTestFlat, styles.chatgptImageJul162025023Layout]} resizeMode="cover" />
                                </View>
                                <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                                <Image style={[styles.arrowUpRightUndefinedG, styles.arrowLayout]} resizeMode="cover" />
                                <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                    <View style={[styles.frameChild, styles.frameChildLayout]} />
                                    <View style={styles.frameChildPosition1} />
                                    <View style={styles.frameChildPosition} />
                                    <Text style={[styles.getIn, styles.amTypo1]}>Get IN</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.body1, styles.body1Position]}>
                            <View style={[styles.mathQuiz, styles.mathLayout]}>
                                <View style={[styles.mathQuizChild, styles.categoriesBg]} />
                                <Text style={[styles.cricket, styles.ludoClr]}>Cricket</Text>
                                <Text style={[styles.challengeYourReasoning, styles.yourTypo]}>Test your skills and intuition with our Cricket Fantasy Prediction game!</Text>
                                <View style={[styles.chatgptImageJul13202503Parent, styles.chatgptParentLayout]}>
                                    <View style={[styles.chatgptImageJul13202503, styles.chatgptParentLayout]} />
                                </View>
                                <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                                <Image style={[styles.arrowUpRightUndefinedG, styles.arrowLayout]} resizeMode="cover" />
                                <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                    <View style={[styles.frameChild, styles.frameChildLayout]} />
                                    <View style={styles.frameChildPosition1} />
                                    <View style={styles.frameChildPosition} />
                                    <Text style={[styles.getIn, styles.amTypo1]}>Get IN</Text>
                                </View>
                                <Image style={[styles.createAFlatIllustrationOf, styles.chatgptParentLayout]} resizeMode="cover" />
                            </View>
                            <View style={[styles.mathQuiz, styles.mathLayout]}>
                                <View style={[styles.mathQuizChild, styles.categoriesBg]} />
                                <Text style={[styles.cricket, styles.ludoClr]}>Football</Text>
                                <Text style={[styles.challengeYourReasoning, styles.yourTypo]}>Build Your Dream Team, Analyze, Predict, Dominate the Game.</Text>
                                <View style={[styles.chatgptImageJul13202503Parent, styles.chatgptParentLayout]}>
                                    <View style={[styles.chatgptImageJul13202503, styles.chatgptParentLayout]} />
                                </View>
                                <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                                <Image style={[styles.arrowUpRightUndefinedG, styles.arrowLayout]} resizeMode="cover" />
                                <Image style={[styles.chatgptImageJul162025024, styles.chatgptPosition]} resizeMode="cover" />
                                <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                    <View style={[styles.frameChild, styles.frameChildLayout]} />
                                    <View style={styles.frameChildPosition1} />
                                    <View style={styles.frameChildPosition} />
                                    <Text style={[styles.getIn, styles.amTypo1]}>Get IN</Text>
                                </View>
                                <Image style={[styles.createAFlatIllustrationOf2, styles.createLayout]} resizeMode="cover" />
                            </View>
                            <View style={[styles.mathQuiz, styles.mathLayout]}>
                                <View style={[styles.mathQuizChild, styles.categoriesBg]} />
                                <Image style={styles.ellipseIcon} resizeMode="cover" />
                                <Text style={[styles.cricket, styles.ludoClr]}>Kabaddi</Text>
                                <Text style={[styles.challengeYourReasoning, styles.yourTypo]}>See your Kabaddi Knowledge, Raid, Tackle, Predict – Play Like a Pro</Text>
                                <View style={[styles.chatgptImageJul13202503Parent, styles.chatgptParentLayout]}>
                                    <View style={[styles.chatgptImageJul13202503, styles.chatgptParentLayout]} />
                                </View>
                                <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                                <Image style={[styles.arrowUpRightUndefinedG, styles.arrowLayout]} resizeMode="cover" />
                                <Image style={styles.kabbadiGameFlatIllustration} resizeMode="cover" />
                                <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                    <View style={[styles.frameChild, styles.frameChildLayout]} />
                                    <View style={styles.frameChildPosition1} />
                                    <View style={styles.frameChildPosition} />
                                    <Text style={[styles.getIn, styles.amTypo1]}>Get IN</Text>
                                </View>
                            </View>
                            <View style={[styles.mathQuiz, styles.mathLayout]}>
                                <View style={[styles.mathQuizChild, styles.categoriesBg]} />
                                <Text style={[styles.cricket, styles.ludoClr]}>Esports</Text>
                                <Text style={[styles.challengeYourReasoning, styles.yourTypo]}>Analyze the Plays. Predict the Outcome. Pick Your Champs. Predict the Clutch.</Text>
                                <View style={[styles.chatgptImageJul13202503Parent, styles.chatgptParentLayout]}>
                                    <View style={[styles.chatgptImageJul13202503, styles.chatgptParentLayout]} />
                                    <Image style={[styles.esportsGameFlatIllustration, styles.gameLayout]} resizeMode="cover" />
                                </View>
                                <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                                <Image style={[styles.arrowUpRightUndefinedG, styles.arrowLayout]} resizeMode="cover" />
                                <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                    <View style={[styles.frameChild, styles.frameChildLayout]} />
                                    <View style={styles.frameChildPosition1} />
                                    <View style={styles.frameChildPosition} />
                                    <Text style={[styles.getIn, styles.amTypo1]}>Get IN</Text>
                                </View>
                            </View>
                            <View style={[styles.mathQuiz, styles.mathLayout]}>
                                <View style={[styles.mathQuizChild, styles.categoriesBg]} />
                                <Text style={[styles.cricket, styles.ludoClr]}>Stocks</Text>
                                <Text style={[styles.challengeYourReasoning, styles.yourTypo]}>Stocks Made Simple, Fun, and Competitive, Guess the Gains. Climb the Ranks</Text>
                                <View style={[styles.chatgptImageJul13202503Parent, styles.chatgptParentLayout]}>
                                    <View style={[styles.chatgptImageJul13202503, styles.chatgptParentLayout]} />
                                    <Image style={[styles.createAStocksFlatIllustrat, styles.frameParentPosition]} resizeMode="cover" />
                                </View>
                                <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                                <Image style={[styles.arrowUpRightUndefinedG, styles.arrowLayout]} resizeMode="cover" />
                                <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                    <View style={[styles.frameChild, styles.frameChildLayout]} />
                                    <View style={styles.frameChildPosition1} />
                                    <View style={styles.frameChildPosition} />
                                    <Text style={[styles.getIn, styles.amTypo1]}>Get IN</Text>
                                </View>
                            </View>
                            <View style={[styles.mathQuiz, styles.mathLayout]}>
                                <View style={[styles.mathQuizChild, styles.categoriesBg]} />
                                <Text style={styles.mathsQuiz2}>Maths Quiz</Text>
                                <Text style={[styles.testYourLogic2, styles.yourTypo]}>{`Test your logic and speed with quick mental math's challenges. `}</Text>
                                <View style={[styles.chatgptImageJul13202503Parent, styles.chatgptParentLayout]}>
                                    <View style={[styles.chatgptImageJul13202503, styles.chatgptParentLayout]} />
                                    <Image style={styles.chatgptImageJul16202502} resizeMode="cover" />
                                </View>
                                <Image style={[styles.questionCircleUndefined14, styles.undefinedLayout]} resizeMode="cover" />
                                <Image style={[styles.arrowUpRightUndefinedG14, styles.arrowLayout]} resizeMode="cover" />
                            </View>
                        </View>
                        <View style={[styles.puzzleList, styles.body1Position]}>
                            <View style={[styles.mathQuiz, styles.mathLayout]}>
                                <View style={[styles.mathQuizChild, styles.categoriesBg]} />
                                <Text style={[styles.cricket, styles.ludoClr]}>Logic Puzzle</Text>
                                <Text style={[styles.challengeYourReasoning, styles.yourTypo]}>Challenge your mind and unleash your creativity with Logic Puzzle Adventure.</Text>
                                <View style={[styles.chatgptImageJul13202503Parent, styles.chatgptParentLayout]}>
                                    <View style={[styles.chatgptImageJul13202503, styles.chatgptParentLayout]} />
                                </View>
                                <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                                <Image style={[styles.arrowUpRightUndefinedG, styles.arrowLayout]} resizeMode="cover" />
                                <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                    <View style={[styles.frameChild, styles.frameChildLayout]} />
                                    <View style={styles.frameChildPosition1} />
                                    <View style={styles.frameChildPosition} />
                                    <Text style={[styles.getIn, styles.amTypo1]}>Get IN</Text>
                                </View>
                                <Image style={[styles.createAFlatIllustrationOf, styles.chatgptParentLayout]} resizeMode="cover" />
                            </View>
                            <View style={[styles.mathQuiz, styles.mathLayout]}>
                                <View style={[styles.mathQuizChild, styles.categoriesBg]} />
                                <Text style={[styles.cricket, styles.ludoClr]}>Number Puzzle</Text>
                                <Text style={[styles.challengeYourReasoning, styles.yourTypo]}>Think you can guess ? Unravel Mysteries, Anticipate the next number.</Text>
                                <View style={[styles.chatgptImageJul13202503Parent, styles.chatgptParentLayout]}>
                                    <View style={[styles.chatgptImageJul13202503, styles.chatgptParentLayout]} />
                                </View>
                                <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                                <Image style={[styles.arrowUpRightUndefinedG, styles.arrowLayout]} resizeMode="cover" />
                                <Image style={[styles.chatgptImageJul162025024, styles.chatgptPosition]} resizeMode="cover" />
                                <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                    <View style={[styles.frameChild, styles.frameChildLayout]} />
                                    <View style={styles.frameChildPosition1} />
                                    <View style={styles.frameChildPosition} />
                                    <Text style={[styles.getIn, styles.amTypo1]}>Get IN</Text>
                                </View>
                                <Image style={[styles.createAFlatIllustrationOf3, styles.createLayout]} resizeMode="cover" />
                            </View>
                            <View style={[styles.mathQuiz, styles.mathLayout]}>
                                <View style={[styles.mathQuizChild, styles.categoriesBg]} />
                                <Text style={[styles.cricket, styles.ludoClr]}>Word Puzzle</Text>
                                <Text style={[styles.challengeYourReasoning, styles.yourTypo]}>Time Clicking away, Find the correct words and win big prizes.</Text>
                                <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                                <Image style={[styles.arrowUpRightUndefinedG, styles.arrowLayout]} resizeMode="cover" />
                                <View style={[styles.chatgptImageJul13202503Parent8, styles.chatgptParentLayout]}>
                                    <View style={[styles.chatgptImageJul13202503, styles.chatgptParentLayout]} />
                                    <Image style={[styles.createAWordPuzzleGameFla, styles.gameLayout]} resizeMode="cover" />
                                </View>
                                <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                    <View style={[styles.frameChild, styles.frameChildLayout]} />
                                    <View style={styles.frameChildPosition1} />
                                    <View style={styles.frameChildPosition} />
                                    <Text style={[styles.getIn, styles.amTypo1]}>Get IN</Text>
                                </View>
                            </View>
                            <View style={[styles.mathQuiz, styles.mathLayout]}>
                                <View style={[styles.mathQuizChild, styles.categoriesBg]} />
                                <Text style={[styles.cricket, styles.ludoClr]}>Picture Puzzle</Text>
                                <Text style={[styles.challengeYourReasoning, styles.yourTypo]}>Images Shifting, Discover the Hidden Scenes and unlock amazing rewards.</Text>
                                <View style={[styles.chatgptImageJul13202503Parent, styles.chatgptParentLayout]}>
                                    <View style={[styles.chatgptImageJul13202503Parent2, styles.chatgptParentLayout]}>
                                        <View style={[styles.chatgptImageJul13202503, styles.chatgptParentLayout]} />
                                        <Image style={[styles.createAPicturePuzzleGameF, styles.text3Position]} resizeMode="cover" />
                                    </View>
                                </View>
                                <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                                <Image style={[styles.arrowUpRightUndefinedG, styles.arrowLayout]} resizeMode="cover" />
                                <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                    <View style={[styles.frameChild, styles.frameChildLayout]} />
                                    <View style={styles.frameChildPosition1} />
                                    <View style={styles.frameChildPosition} />
                                    <Text style={[styles.getIn, styles.amTypo1]}>Get IN</Text>
                                </View>
                            </View>
                            <View style={[styles.mathQuiz, styles.mathLayout]}>
                                <View style={[styles.mathQuizChild, styles.categoriesBg]} />
                                <Text style={[styles.cricket, styles.ludoClr]}>Sequence Puzzle</Text>
                                <Text style={[styles.challengeYourReasoning, styles.yourTypo]}>Time is Ticking, Arrange the patterns correctly  and Unlock Exciting Rewards.</Text>
                                <View style={[styles.chatgptImageJul13202503Parent, styles.chatgptParentLayout]}>
                                    <View style={[styles.chatgptImageJul13202503, styles.chatgptParentLayout]} />
                                    <Image style={styles.createASequencePuzzleGame} resizeMode="cover" />
                                </View>
                                <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                                <Image style={[styles.arrowUpRightUndefinedG, styles.arrowLayout]} resizeMode="cover" />
                                <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                    <View style={[styles.frameChild, styles.frameChildLayout]} />
                                    <View style={styles.frameChildPosition1} />
                                    <View style={styles.frameChildPosition} />
                                    <Text style={[styles.getIn, styles.amTypo1]}>Get IN</Text>
                                </View>
                            </View>
                            <View style={[styles.mathQuiz, styles.mathLayout]}>
                                <View style={[styles.mathQuizChild, styles.categoriesBg]} />
                                <Text style={styles.mathsQuiz2}>Maths Quiz</Text>
                                <Text style={[styles.testYourLogic2, styles.yourTypo]}>{`Test your logic and speed with quick mental math's challenges. `}</Text>
                                <View style={[styles.chatgptImageJul13202503Parent, styles.chatgptParentLayout]}>
                                    <View style={[styles.chatgptImageJul13202503, styles.chatgptParentLayout]} />
                                    <Image style={styles.chatgptImageJul16202502} resizeMode="cover" />
                                </View>
                                <Image style={[styles.questionCircleUndefined14, styles.undefinedLayout]} resizeMode="cover" />
                                <Image style={[styles.arrowUpRightUndefinedG14, styles.arrowLayout]} resizeMode="cover" />
                            </View>
                        </View>
                        <ScrollView style={[styles.chessList, styles.chessListLayout]}>
                            <View style={[styles.mathQuizParent, styles.body1Position]}>
                                <View style={[styles.mathQuiz, styles.mathLayout]}>
                                    <View style={[styles.mathQuizChild, styles.categoriesBg]} />
                                    <Text style={[styles.cricket, styles.ludoClr]}>Classic Chess</Text>
                                    <Text style={[styles.challengeYourReasoning, styles.yourTypo]}>Unleash Your Inner Grandmaster: Dive into the Thrilling World of Classic Chess!</Text>
                                    <View style={[styles.chatgptImageJul13202503Parent, styles.chatgptParentLayout]}>
                                        <View style={[styles.chatgptImageJul13202503, styles.chatgptParentLayout]} />
                                    </View>
                                    <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                                    <Image style={[styles.arrowUpRightUndefinedG, styles.arrowLayout]} resizeMode="cover" />
                                    <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                        <View style={[styles.frameChild, styles.frameChildLayout]} />
                                        <View style={styles.frameChildPosition1} />
                                        <View style={styles.frameChildPosition} />
                                        <Text style={[styles.getIn, styles.amTypo1]}>Get IN</Text>
                                    </View>
                                    <Image style={styles.createAClassicChessFlatIl} resizeMode="cover" />
                                </View>
                                <View style={[styles.mathQuiz, styles.mathLayout]}>
                                    <View style={[styles.mathQuizChild, styles.categoriesBg]} />
                                    <Image style={styles.ellipseIcon} resizeMode="cover" />
                                    <Text style={[styles.cricket, styles.ludoClr]}>Bullet Chess</Text>
                                    <Text style={[styles.challengeYourReasoning, styles.yourTypo]}>Master Your Moves: Strategize, Capture, and Conquer in Bullet Chess!</Text>
                                    <View style={[styles.chatgptImageJul13202503Parent8, styles.chatgptParentLayout]}>
                                        <View style={[styles.chatgptImageJul13202503Parent12, styles.chatgptParentLayout]}>
                                            <View style={[styles.chatgptImageJul13202503, styles.chatgptParentLayout]} />
                                            <Image style={styles.createABulletChessGameFla} resizeMode="cover" />
                                        </View>
                                    </View>
                                    <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                                    <Image style={[styles.arrowUpRightUndefinedG, styles.arrowLayout]} resizeMode="cover" />
                                    <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                        <View style={[styles.frameChild, styles.frameChildLayout]} />
                                        <View style={styles.frameChildPosition1} />
                                        <View style={styles.frameChildPosition} />
                                        <Text style={[styles.getIn, styles.amTypo1]}>Get IN</Text>
                                    </View>
                                </View>
                                <View style={[styles.mathQuiz, styles.mathLayout]}>
                                    <View style={[styles.mathQuizChild, styles.categoriesBg]} />
                                    <Text style={[styles.cricket, styles.ludoClr]}>Tournaments</Text>
                                    <Text style={[styles.challengeYourReasoning, styles.yourTypo]}>Evaluate the Moves. Forecast the Results. Choose Your Players. Anticipate the Victory.</Text>
                                    <View style={[styles.chatgptImageJul13202503Parent8, styles.chatgptParentLayout]}>
                                        <View style={[styles.chatgptImageJul13202503, styles.chatgptParentLayout]} />
                                        <Image style={[styles.chessTournamentFlatIllustra, styles.instanceChildPosition]} resizeMode="cover" />
                                    </View>
                                    <Image style={[styles.questionCircleUndefined, styles.undefinedLayout]} resizeMode="cover" />
                                    <Image style={[styles.arrowUpRightUndefinedG, styles.arrowLayout]} resizeMode="cover" />
                                    <View style={[styles.rectangleParent, styles.frameChildLayout]}>
                                        <View style={[styles.frameChild, styles.frameChildLayout]} />
                                        <View style={styles.frameChildPosition1} />
                                        <View style={styles.frameChildPosition} />
                                        <Text style={[styles.getIn, styles.amTypo1]}>Get IN</Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={[styles.byRsrGames, styles.quizzesFlexBox]}>by RSR Games</Text>
                            <Image style={[styles.chessListChild, styles.vectorIconLayout]} resizeMode="cover" />
                        </ScrollView>
                    </ScrollView>

                    <View style={[styles.categories, styles.statusbarPosition]}>
                        <ScrollView style={[styles.frameParent, styles.frameParentPosition]} horizontal={true} contentContainerStyle={styles.frameContainer29Content}>
                            <View style={styles.frameWrapper}>
                                <View style={[styles.appsUndefinedGlyphUndeParent, styles.parentFlexBox1]}>
                                    <Image style={[styles.appsUndefinedGlyphUnde, styles.undefinedLayout]} resizeMode="cover" />
                                    <Text style={[styles.quizzes, styles.text4Typo]}>Quizzes</Text>
                                </View>
                            </View>
                            <Pressable style={styles.frameWrapper} onPress={() => navigation.navigate('Ludo')}>
                                <View style={[styles.appsUndefinedGlyphUndeGroup, styles.parentFlexBox1]}>
                                    <Image style={[styles.appsUndefinedGlyphUnde, styles.undefinedLayout]} resizeMode="cover" />
                                    <Image style={[styles.appsUndefinedGlyphUnde, styles.undefinedLayout]} resizeMode="cover" />
                                    <Image style={[styles.appsUndefinedGlyphUnde, styles.undefinedLayout]} resizeMode="cover" />
                                    <Image style={[styles.appsUndefinedGlyphUnde, styles.undefinedLayout]} resizeMode="cover" />
                                    <Text style={[styles.ludo, styles.ludoClr]}>Ludo</Text>
                                </View>
                            </Pressable>
                            <View style={styles.frameWrapper}>
                                <View style={[styles.appsUndefinedGlyphUndeGroup, styles.parentFlexBox1]}>
                                    <Image style={[styles.appsUndefinedGlyphUnde, styles.undefinedLayout]} resizeMode="cover" />
                                    <Image style={[styles.appsUndefinedGlyphUnde, styles.undefinedLayout]} resizeMode="cover" />
                                    <Text style={[styles.ludo, styles.ludoClr]}>Puzzles</Text>
                                </View>
                            </View>
                            <View style={styles.frameWrapper}>
                                <View style={[styles.appsUndefinedGlyphUndeGroup, styles.parentFlexBox1]}>
                                    <Image style={[styles.appsUndefinedGlyphUnde, styles.undefinedLayout]} resizeMode="cover" />
                                    <Image style={[styles.appsUndefinedGlyphUnde, styles.undefinedLayout]} resizeMode="cover" />
                                    <Image style={[styles.appsUndefinedGlyphUnde, styles.undefinedLayout]} resizeMode="cover" />
                                    <Text style={[styles.ludo, styles.ludoClr]}>Chess</Text>
                                </View>
                            </View>
                        </ScrollView>
                        <View style={[styles.categoriesChild, styles.batteryEndIconLayout]} />
                    </View>
                </View>

                <LinearGradient style={styles.profilePointsbar} locations={[0, 1]} colors={['#02121a', '#0d3648']} useAngle={true} angle={-90}>
                    <Image style={[styles.profilePointsbarChild, styles.profileLayout]} resizeMode="cover" />
                    <View style={[styles.rectangleParent19, styles.rectangleParent19Layout]}>
                        <View style={styles.groupChild} />
                        <Image style={[styles.groupItem, styles.groupItemPosition]} resizeMode="cover" />
                        <Text style={styles.text}>12058 / 25000</Text>
                        <View style={styles.starParentPosition}>
                            <Image style={[styles.groupInner, styles.starParentPosition]} resizeMode="cover" />
                            <Text style={styles.text2}>12</Text>
                        </View>
                    </View>
                    <Image style={[styles.profilePointsbarItem, styles.profileLayout]} resizeMode="cover" />
                    <View style={[styles.frameGroup, styles.groupFlexBox]}>
                        <View style={[styles.groupParent, styles.groupFlexBox]}>
                            <Image style={styles.profileLayout} resizeMode="cover" />
                            <Image style={styles.frameChild61} resizeMode="cover" />
                        </View>
                        <View style={[styles.groupContainer, styles.groupFlexBox]}>
                            <View style={styles.walletUndefinedGlyphUnParent}>
                                <Image style={[styles.walletUndefinedGlyphUn, styles.undefinedLayout]} resizeMode="cover" />
                                <Text style={[styles.text3, styles.text3Position]}>₹1,999</Text>
                            </View>
                            <Image style={[styles.alertUndefinedGlyphUnd, styles.undefinedLayout]} resizeMode="cover" />
                        </View>
                    </View>
                    <Image style={[styles.vectorIcon4, styles.vectorIconLayout]} resizeMode="cover" />
                    <View style={[styles.profilePointsbarInner, styles.statusbarPosition]}>
                        <View style={styles.frameParent2}>
                            <LinearGradient style={[styles.ellipseParent, styles.parentLayout]} locations={[0, 0.43, 0.55, 1]} colors={['#e65050', '#b45050', '#34348e', '#4040bc']} useAngle={true} angle={90}>
                                <Image style={[styles.frameChild62, styles.frameChild62Layout]} resizeMode="cover" />
                                <Image style={[styles.chatgptImageJul1320250324, styles.chatgptLayout1]} resizeMode="cover" />
                                <View style={[styles.winBigInParent, styles.createLayout]}>
                                    <Text style={[styles.winBigIn, styles.winLayout]}>WIN BIG IN</Text>
                                    <Text style={[styles.ultimateTournament, styles.trendingGamesText1]}>Ultimate Tournament</Text>
                                </View>
                                <View style={[styles.timeParent, styles.parentFlexBox]}>
                                    <Text style={[styles.time2, styles.getInTypo]}>Time</Text>
                                    <Text style={[styles.am, styles.amTypo]}>5:30 AM</Text>
                                </View>
                                <View style={styles.peopleTeamUndefinedGlypParent}>
                                    <Image style={styles.peopleTeamUndefinedGlyp} resizeMode="cover" />
                                    <Text style={[styles.text4, styles.amTypo]}>2500+</Text>
                                </View>
                                <View style={[styles.prizePoolParent, styles.frameChild63Position]}>
                                    <Text style={[styles.time2, styles.getInTypo]}>Prize Pool</Text>
                                    <Text style={[styles.am, styles.amTypo]}>1 Lac</Text>
                                </View>
                            </LinearGradient>
                            <LinearGradient style={[styles.chatgptImageJul13202506Parent, styles.parentLayout]} locations={[0, 0, 0.55, 1]} colors={['#302a2a', '#3c3333', '#090936', '#4f4fd7']} useAngle={true} angle={92.53}>
                                <Image style={[styles.chatgptImageJul13202506, styles.chatgptLayout]} resizeMode="cover" />
                                <Image style={[styles.chatgptImageJul132025062, styles.chatgptLayout]} resizeMode="cover" />
                                <View style={[styles.frameChild63, styles.frameChild63Position]} />
                                <Image style={[styles.chatgptImageJul7202510, styles.chatgptLayout1]} resizeMode="cover" />
                                <Text style={[styles.trendingGames, styles.trendingGamesText1]}>Trending Games</Text>
                                <Image style={[styles.chatgptImageJul132025063, styles.frameChild62Layout]} resizeMode="cover" />
                                <Image style={styles.chatgptImageJul132025064} resizeMode="cover" />
                                <Image style={[styles.chatgptImageJul132025065, styles.frameChild63Position]} resizeMode="cover" />
                                <Image style={[styles.chatgptImageJul132025066, styles.rectangleParent19Layout]} resizeMode="cover" />
                                <Text style={[styles.winBigPrizes, styles.winLayout]}>WIN BIG Prizes</Text>
                                <Text style={[styles.playWithFriends, styles.winLayout]}>Play With Friends Online</Text>
                            </LinearGradient>
                        </View>
                    </View>
                </LinearGradient>
            </View>
            </View>
        </SafeAreaView>);
};

const styles = StyleSheet.create({
    frameContainer29Content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 21
    },
    quizess: {
        flex: 1,
        backgroundColor: "#f4f6f6"
    },
    viewLayout: {
        width: "100%",
        overflow: "hidden"
    },
    chessListLayout: {
        maxWidth: 393,
        width: 393,
        position: "relative",
        flex: 1
    },
    body1Position: {
        width: 361,
        gap: 8,
        top: 12,
        position: "relative"
    },
    mathLayout: {
        borderWidth: 1,
        height: 94
    },
    categoriesBg: {
        backgroundColor: "#fff",
        borderStyle: "solid"
    },
    quizzesFlexBox: {
        textAlign: "left",
        lineHeight: 20
    },
    yourTypo: {
        color: "#646c6d",
        lineHeight: 16,
        fontSize: 12,
        textAlign: "left",
        left: 88,
        position: "relative"
    },
    chatgptParentLayout: {
        height: 64,
        position: "relative"
    },
    undefinedLayout: {
        width: 24,
        height: 24
    },
    arrowLayout: {
        width: 32,
        borderRadius: 18,
        top: 52,
        height: 32,
        right: 14,
        position: "absolute"
    },
    frameChildLayout: {
        width: 84,
        position: "absolute"
    },
    amTypo1: {
        fontFamily: "Montserrat-ExtraBold",
        fontWeight: "800"
    },
    chatgptImageJul162025023Layout: {
        width: 59,
        position: "absolute"
    },
    gameLayout: {
        width: 60,
        position: "absolute"
    },
    flatPosition: {
        width: 63,
        left: 0,
        position: "absolute"
    },
    ludoClr: {
        color: "#728181",
        textAlign: "left",
        lineHeight: 20
    },
    chatgptPosition: {
        height: 54,
        width: 56,
        left: 18,
        top: 19,
        position: "absolute"
    },
    createLayout: {
        height: 47,
        position: "relative"
    },
    frameParentPosition: {
        top: 4,
        position: "relative"
    },
    text3Position: {
        top: 6,
        position: "relative"
    },
    instanceChildPosition: {
        top: 3,
        position: "relative"
    },
    vectorIconLayout: {
        maxHeight: "100%",
        maxWidth: "100%",
        position: "absolute",
        overflow: "hidden"
    },
    bottomNavPosition: {
        height: 68,
        bottom: 0,
        width: 393,
        left: 0,
        position: "relative"
    },
    eventsLayout: {
        width: 76,
        height: 68,
        backgroundColor: "#fff",
        position: "relative",
        overflow: "hidden"
    },
    timeTypo: {
        textAlign: "center",
        fontWeight: "600",
        position: "relative"
    },
    groupItemPosition: {
        left: 27,
        position: "relative"
    },
    vectorIconPosition: {
        bottom: "44.12%",
        top: "23.53%",
        height: "32.35%",
        maxHeight: "100%",
        maxWidth: "100%",
        position: "relative",
        overflow: "hidden"
    },
    xLayout: {
        height: 67,
        width: 67,
        position: "relative"
    },
    statusbarPosition: {
        marginLeft: -196.5,
        left: "50%",
        width: 393,
        position: "relative"
    },
    parentFlexBox1: {
        gap: 6,
        flexDirection: "row"
    },
    text4Typo: {
        fontFamily: "Montserrat-Bold",
        fontWeight: "700"
    },
    batteryEndIconLayout: {
        height: 4,
        position: "relative"
    },
    leftSideLayout: {
        height: 21,
        width: 54,
        left: "50%",
        position: "relative"
    },
    iconPosition1: {
        maxWidth: "100%",
        top: "50%",
        position: "relative",
        overflow: "hidden"
    },
    iconPosition: {
        height: 12,
        left: "50%",
        top: 1,
        position: "relative"
    },
    profileLayout: {
        height: 40,
        width: 40
    },
    rectangleParent19Layout: {
        height: 36,
        position: "relative"
    },
    starParentPosition: {
        width: 36,
        height: 36,
        top: 0,
        left: 0,
        position: "relative"
    },
    groupFlexBox: {
        flexDirection: "row",
        alignItems: "center"
    },
    parentLayout: {
        width: 359,
        borderColor: "#ac5e07",
        borderRadius: 23,
        height: 90,
        backgroundColor: "transparent",
        top: 0,
        borderWidth: 1,
        borderStyle: "solid",
        position: "relative",
        overflow: "hidden"
    },
    frameChild62Layout: {
        height: 104,
        position: "relative"
    },
    chatgptLayout1: {
        width: 114,
        position: "relative"
    },
    winLayout: {
        lineHeight: 13,
        color: "#fff",
        textAlign: "left",
        position: "relative"
    },
    trendingGamesText1: {
        textShadowColor: "rgba(0, 0, 0, 0.12)",
        textShadowRadius: 0,
        textAlign: "center",
        color: "#fff",
        position: "relative"
    },
    parentFlexBox: {
        alignItems: "flex-end",
        left: 16
    },
    getInTypo: {
        lineHeight: 12,
        color: "#fff",
        fontSize: 12,
        textAlign: "left"
    },
    amTypo: {
        fontSize: 13,
        lineHeight: 13,
        color: "#fff",
        textAlign: "left"
    },
    frameChild63Position: {
        top: 62,
        position: "relative"
    },
    chatgptLayout: {
        width: 46,
        height: 46,
        position: "relative"
    },
    viewBg: {
        backgroundColor: "#f4f6f6",
        flex: 1
    },
    view: {
        height: 1130,
        overflow: "hidden",
        backgroundColor: "#f4f6f6",
        flex: 1
    },
    mainBody: {
        top: 209,
        height: 921,
        width: 393,
        left: 0,
        position: "absolute"
    },
    contentBody: {
        top: 44,
        left: 0
    },
    mathQuizParent: {
        gap: 8,
        left: 16
    },
    mathQuiz: {
        elevation: 4,
        borderRadius: 12,
        borderColor: "#eaeaea",
        borderStyle: "solid",
        alignSelf: "stretch",
        overflow: "hidden"
    },
    mathQuizChild: {
        left: -1,
        borderRadius: 10,
        borderColor: "rgba(217, 217, 217, 0.6)",
        width: 363,
        top: -1,
        borderWidth: 1,
        height: 94,
        position: "relative"
    },
    mathsQuiz: {
        color: "#272f2f",
        textAlign: "left",
        fontFamily: "Roboto-Bold",
        fontWeight: "600",
        lineHeight: 20,
        fontSize: 15,
        left: 88,
        top: 14,
        position: "relative"
    },
    challengeYourReasoning: {
        top: 38,
        width: 257,
        fontFamily: "OpenSans-Regular"
    },
    chatgptImageJul13202503Parent: {
        width: 64,
        left: 14,
        top: 14
    },
    chatgptImageJul13202503: {
        backgroundColor: "rgba(174, 189, 189, 0.2)",
        borderRadius: 8,
        top: 0,
        width: 64,
        left: 0
    },
    chatgptImageJul16202502: {
        left: 3,
        width: 58,
        height: 60,
        top: 2,
        position: "relative"
    },
    questionCircleUndefined: {
        height: 24,
        right: 14,
        width: 24,
        position: "relative",
        top: 8
    },
    arrowUpRightUndefinedG: {
        display: "none",
        height: 32
    },
    rectangleParent: {
        top: 46,
        left: 265,
        height: 34,
        display: "none",
        borderRadius: 8,
        overflow: "hidden"
    },
    frameChild: {
        elevation: 0,
        borderRadius: 6,
        backgroundColor: "#008d9d",
        height: 32,
        top: 0,
        left: 0
    },
    frameChildPosition1: {
        opacity: 0.18,
        transform: [
            {
                rotate: "-19.7deg"
            }
        ],
        height: 57,
        width: 7,
        backgroundColor: "#f1f1f1",
        left: -4,
        top: -6,
        position: "absolute"
    },
    frameChildPosition: {
        width: 2,
        left: -11,
        top: -5,
        opacity: 0.18,
        transform: [
            {
                rotate: "-19.7deg"
            }
        ],
        height: 57,
        backgroundColor: "#f1f1f1",
        position: "absolute"
    },
    getIn: {
        left: 22,
        color: "#fff",
        lineHeight: 12,
        fontSize: 12,
        textAlign: "left",
        top: 10,
        fontWeight: "800",
        position: "absolute"
    },
    chatgptImageJul162025023: {
        height: 55,
        left: 17,
        width: 59,
        top: 18
    },
    musicFlatIconForMusicQuiz: {
        height: 62,
        left: 2,
        top: 2
    },
    politicsFlatColoredIcon: {
        height: 62,
        top: 0
    },
    chatgptImageJul13202503Parent2: {
        borderRadius: 8,
        top: 0,
        width: 64,
        left: 0,
        overflow: "hidden"
    },
    createAFlatIllustrationFor: {
        height: 63,
        top: 1
    },
    createAProgrammingTestFlat: {
        height: 59,
        left: 2,
        top: 2
    },
    body1: {
        marginLeft: 270.5,
        left: "50%",
        gap: 8
    },
    cricket: {
        fontFamily: "Roboto-Bold",
        fontSize: 15,
        fontWeight: "600",
        position: "relative",
        left: 88,
        color: "#728181",
        top: 14
    },
    createAFlatIllustrationOf: {
        width: 54,
        left: 19,
        top: 14
    },
    chatgptImageJul162025024: {
        display: "none"
    },
    createAFlatIllustrationOf2: {
        top: 24,
        width: 52,
        left: 19
    },
    ellipseIcon: {
        top: 63,
        height: 5,
        width: 52,
        left: 19,
        position: "relative"
    },
    kabbadiGameFlatIllustration: {
        top: 25,
        height: 50,
        width: 64,
        left: 14,
        position: "relative"
    },
    esportsGameFlatIllustration: {
        height: 53,
        left: 2,
        top: 2
    },
    createAStocksFlatIllustrat: {
        width: 61,
        left: 2,
        height: 55
    },
    mathsQuiz2: {
        lineHeight: 22,
        fontSize: 18,
        textAlign: "left",
        color: "#272f2f",
        fontFamily: "Roboto-Bold",
        fontWeight: "600",
        left: 88,
        top: 14,
        position: "relative"
    },
    testYourLogic2: {
        fontFamily: "OpenSans-SemiBold",
        width: 214,
        top: 40,
        fontWeight: "600"
    },
    questionCircleUndefined14: {
        height: 24,
        right: 14,
        width: 24,
        position: "relative",
        top: 12
    },
    arrowUpRightUndefinedG14: {
        height: 32
    },
    puzzleList: {
        left: 918,
        gap: 8
    },
    createAFlatIllustrationOf3: {
        top: 22,
        left: 20,
        width: 52
    },
    chatgptImageJul13202503Parent8: {
        borderRadius: 8,
        width: 64,
        left: 14,
        top: 14,
        overflow: "hidden"
    },
    createAWordPuzzleGameFla: {
        top: -4,
        left: 4,
        height: 75
    },
    createAPicturePuzzleGameF: {
        height: 58,
        borderRadius: 8,
        width: 64,
        left: 0
    },
    createASequencePuzzleGame: {
        height: 46,
        top: 9,
        width: 60,
        left: 2,
        position: "relative"
    },
    chessList: {
        left: 1369,
        top: 12
    },
    createAClassicChessFlatIl: {
        height: 56,
        top: 18,
        width: 56,
        left: 18,
        borderRadius: 8,
        position: "relative"
    },
    chatgptImageJul13202503Parent12: {
        top: 0,
        width: 64,
        left: 0
    },
    createABulletChessGameFla: {
        height: 62,
        top: 0,
        width: 64,
        left: 0,
        position: "relative"
    },
    chessTournamentFlatIllustra: {
        left: -2,
        width: 68,
        height: 62
    },
    byRsrGames: {
        top: 440,
        left: 249,
        color: "#a4a4a4",
        opacity: 0.4,
        fontFamily: "Roboto-Bold",
        fontSize: 15,
        fontWeight: "600",
        position: "relative",
        lineHeight: 20,
        textAlign: "left"
    },
    chessListChild: {
        height: "18.83%",
        width: "58.85%",
        top: "73.54%",
        right: "36.56%",
        bottom: "7.63%",
        left: "4.58%",
        opacity: 0.4
    },
    unionIcon: {
    },
    leaderboard: {
        marginTop: -34,
        marginLeft: -192.5,
        top: "50%",
        left: "50%"
    },
    leaderboard2: {
        color: "#8d9f9f",
        fontFamily: "Montserrat-SemiBold",
        lineHeight: 8,
        fontSize: 11,
        textAlign: "center",
        top: 44,
        left: 2
    },
    leaderboardChild: {
        top: 15,
        width: 21,
        height: 23
    },
    events: {
        left: 80,
        top: 0
    },
    events2: {
        color: "#8d9f9f",
        fontFamily: "Montserrat-SemiBold",
        lineHeight: 8,
        fontSize: 11,
        textAlign: "center",
        top: 44,
        left: 19
    },
    vectorIcon: {
        height: "23.53%",
        width: "32.89%",
        top: "27.94%",
        right: "32.89%",
        bottom: "48.53%",
        left: "34.21%"
    },
    profile: {
        left: 317,
        top: 0
    },
    profile2: {
        color: "#8d9f9f",
        fontFamily: "Montserrat-SemiBold",
        lineHeight: 8,
        fontSize: 11,
        textAlign: "center",
        top: 44,
        left: 20
    },
    vectorIcon2: {
        width: "23.68%",
        right: "38.16%",
        left: "38.16%"
    },
    referals: {
        left: 241,
        top: 0
    },
    referrals: {
        left: 13,
        color: "#8d9f9f",
        fontFamily: "Montserrat-SemiBold",
        lineHeight: 8,
        fontSize: 11,
        textAlign: "center",
        top: 44
    },
    vectorIcon3: {
        width: "28.95%",
        right: "35.53%",
        left: "35.53%"
    },
    x: {
        top: -2,
        left: 163
    },
    xChild: {
        top: 0,
        left: 0
    },
    xInner: {
        width: 39,
        height: 39,
        left: 14,
        top: 14,
        position: "absolute"
    },
    instanceChild: {
        left: 1,
        width: 37,
        height: 34
    },
    categories: {
        borderColor: "#ebebeb",
        borderBottomWidth: 1,
        height: 44,
        top: 0,
        backgroundColor: "#fff",
        borderStyle: "solid",
        overflow: "hidden"
    },
    frameParent: {
        marginLeft: -181.5,
        flexGrow: 0,
        maxWidth: 363,
        left: "50%",
        width: 363,
        flex: 1,
        top: 4
    },
    frameWrapper: {
        paddingHorizontal: 12,
        paddingVertical: 8
    },
    appsUndefinedGlyphUndeParent: {
        alignItems: "center"
    },
    appsUndefinedGlyphUnde: {
        display: "none",
        height: 24
    },
    quizzes: {
        color: "#008d9d",
        fontSize: 16,
        textAlign: "left",
        lineHeight: 20
    },
    appsUndefinedGlyphUndeGroup: {
        alignItems: "center",
        alignSelf: "stretch"
    },
    ludo: {
        fontSize: 16,
        fontFamily: "OpenSans-Regular"
    },
    categoriesChild: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        width: 78,
        top: 40,
        backgroundColor: "#008d9d",
        left: 16
    },
    statusbar: {
        backgroundColor: "#010e0f",
        height: 42,
        top: -1
    },
    statusbar2: {
        height: "100%",
        top: "0%",
        right: "0%",
        bottom: "0%",
        left: "0%",
        position: "absolute",
        overflow: "hidden"
    },
    notch: {
        width: 0,
        height: 0
    },
    leftSide: {
        marginLeft: -168.5,
        top: 14
    },
    statusbarTime: {
        marginLeft: -27,
        borderRadius: 24,
        top: 0
    },
    time: {
        letterSpacing: -0.32,
        lineHeight: 21,
        fontFamily: "Inter-SemiBold",
        height: 20,
        fontSize: 16,
        width: 54,
        top: 1,
        color: "#fff",
        left: 0
    },
    rightSide: {
        marginLeft: 92.5,
        width: 77,
        height: 13,
        left: "50%",
        top: 19,
        position: "absolute"
    },
    statusbarBattery: {
        marginLeft: 11.3,
        width: 27,
        height: 13,
        left: "50%",
        top: 0,
        position: "absolute"
    },
    outlineIcon: {
        marginTop: -6.5,
        right: 2,
        borderRadius: 4,
        opacity: 0.35,
        height: 13,
        top: "50%",
        left: 0
    },
    batteryEndIcon: {
        marginTop: -1.5,
        right: 0,
        width: 1,
        top: "50%",
        opacity: 0.4
    },
    fillIcon: {
        marginTop: -4.5,
        right: 10,
        borderRadius: 2,
        height: 9,
        top: "50%",
        left: 2
    },
    wifiIcon: {
        marginLeft: -12.7,
        width: 17
    },
    iconMobileSignal: {
        marginLeft: -38.7,
        width: 18
    },
    profilePointsbar: {
        height: 168,
        backgroundColor: "transparent",
        top: 41,
        width: 393,
        left: 0,
        position: "absolute",
        overflow: "hidden"
    },
    profilePointsbarChild: {
        left: 18,
        top: 8,
        position: "absolute"
    },
    rectangleParent19: {
        left: 70,
        width: 125,
        display: "none",
        top: 14
    },
    groupChild: {
        left: 8,
        borderRadius: 3,
        backgroundColor: "#998181",
        borderColor: "#eb9e21",
        borderWidth: 0.9,
        width: 117,
        height: 20,
        top: 8,
        borderStyle: "solid",
        position: "absolute"
    },
    groupItem: {
        width: 50,
        height: 19,
        top: 9,
        left: 27
    },
    text: {
        left: 39,
        lineHeight: 11,
        textShadowRadius: 0,
        textShadowOffset: {
            width: 0,
            height: 0.8623188734054565
        },
        textShadowColor: "#000",
        top: 13,
        fontSize: 11,
        color: "#fff",
        fontFamily: "Montserrat-ExtraBold",
        fontWeight: "800",
        textAlign: "left",
        position: "absolute"
    },
    groupInner: {
        borderRadius: 1
    },
    text2: {
        left: 9,
        letterSpacing: 0.23,
        fontWeight: "900",
        fontFamily: "Montserrat-Black",
        textShadowRadius: 0.69,
        textShadowOffset: {
            width: 0,
            height: 0.8623188734054565
        },
        textShadowColor: "#000",
        fontSize: 18,
        color: "#fff",
        top: 10,
        lineHeight: 16,
        textAlign: "left",
        position: "absolute"
    },
    profilePointsbarItem: {
        left: 335,
        display: "none",
        top: 12,
        position: "absolute"
    },
    frameGroup: {
        width: 357,
        justifyContent: "space-between",
        gap: 20,
        alignItems: "center",
        left: 18,
        top: 8,
        position: "absolute"
    },
    groupParent: {
        alignItems: "center",
        gap: 8
    },
    frameChild61: {
        height: 25,
        width: 57
    },
    groupContainer: {
        gap: 12,
        alignItems: "center"
    },
    walletUndefinedGlyphUnParent: {
        width: 69,
        height: 24
    },
    walletUndefinedGlyphUn: {
        height: 24,
        top: 0,
        left: 0,
        position: "absolute"
    },
    text3: {
        left: 28,
        color: "#fff",
        fontFamily: "Montserrat-ExtraBold",
        fontWeight: "800",
        lineHeight: 12,
        fontSize: 12,
        textAlign: "left"
    },
    alertUndefinedGlyphUnd: {
        height: 24
    },
    vectorIcon4: {
        height: "13.1%",
        width: "4.58%",
        top: "10.12%",
        right: "88.04%",
        bottom: "76.79%",
        left: "7.38%"
    },
    profilePointsbarInner: {
        top: 56,
        height: 112,
        overflow: "hidden"
    },
    frameParent2: {
        width: 360,
        height: 90,
        top: 6,
        left: 17,
        position: "absolute"
    },
    ellipseParent: {
        left: 0
    },
    frameChild62: {
        top: 45,
        left: 105,
        width: 153
    },
    chatgptImageJul1320250324: {
        marginLeft: -54.5,
        height: 114,
        left: "50%",
        top: 0
    },
    winBigInParent: {
        top: 17,
        left: 237,
        width: 118
    },
    winBigIn: {
        left: 33,
        fontSize: 9,
        lineHeight: 13,
        fontFamily: "Montserrat-SemiBold",
        fontWeight: "600",
        top: 0
    },
    ultimateTournament: {
        lineHeight: 14,
        fontFamily: "Nosifer Caps",
        width: 118,
        top: 19,
        fontSize: 12,
        textShadowColor: "rgba(0, 0, 0, 0.12)",
        left: 0
    },
    timeParent: {
        top: 41,
        alignItems: "flex-end",
        gap: 6,
        flexDirection: "row",
        position: "absolute"
    },
    time2: {
        fontStyle: "italic",
        fontWeight: "500",
        fontFamily: "Montserrat-MediumItalic",
        color: "#fff"
    },
    am: {
        fontFamily: "Montserrat-ExtraBold",
        fontWeight: "800"
    },
    peopleTeamUndefinedGlypParent: {
        top: 13,
        gap: 6,
        alignItems: "center",
        flexDirection: "row",
        left: 16,
        position: "absolute"
    },
    peopleTeamUndefinedGlyp: {
        width: 20,
        height: 20
    },
    text4: {
        fontFamily: "Montserrat-Bold",
        fontWeight: "700"
    },
    prizePoolParent: {
        alignItems: "flex-end",
        left: 16,
        gap: 6,
        flexDirection: "row"
    },
    chatgptImageJul13202506Parent: {
        left: 377
    },
    chatgptImageJul13202506: {
        left: 291,
        opacity: 0.84,
        top: 2
    },
    chatgptImageJul132025062: {
        top: 31,
        left: 23
    },
    frameChild63: {
        width: 101,
        alignItems: "flex-end",
        left: 16,
        height: 13
    },
    chatgptImageJul7202510: {
        left: 126,
        height: 97,
        top: 1
    },
    trendingGames: {
        left: 145,
        fontSize: 24,
        lineHeight: 30,
        fontFamily: "Pixelify Sans",
        top: 8,
        fontWeight: "600"
    },
    chatgptImageJul132025063: {
        top: 70,
        left: 278,
        width: 110
    },
    chatgptImageJul132025064: {
        top: 21,
        left: 122,
        width: 19,
        opacity: 0.68,
        height: 20,
        position: "absolute"
    },
    chatgptImageJul132025065: {
        left: 155,
        width: 29,
        height: 30
    },
    chatgptImageJul132025066: {
        top: 89,
        left: 116,
        width: 37
    },
    winBigPrizes: {
        left: 203,
        fontSize: 9,
        lineHeight: 13,
        fontFamily: "Montserrat-SemiBold",
        fontWeight: "600",
        top: 44
    },
    playWithFriends: {
        top: 59,
        left: 171,
        fontSize: 10,
        fontFamily: "Montserrat-ExtraBold",
        fontWeight: "800"
    }
});

export default QuizScreen;
