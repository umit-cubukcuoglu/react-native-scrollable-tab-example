import React, { useContext, useEffect, useRef, FC } from "react";
import { ScrollView, RefreshControl } from "react-native";
import Animated from "react-native-reanimated";

import { Context } from "../../hook";
import { IScrollableTabScrollViewProps } from "../../types";

import styes from "./styles";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const List: FC<IScrollableTabScrollViewProps> = (props) => {
    const { layouts, scrollViewNodes, contentOffset, enableScroll, scrollHandler } = useContext(Context);

    const id = useRef(Math.random()).current;

    const paddingTop = layouts.header.height + layouts.tabBar.height;
    const minHeight = layouts.container.height + layouts.header.height;

    useEffect(() => {
        props.isFocused && enableScroll(id);
    }, [props.isFocused]);

    return (
        <AnimatedScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            bounces={false}
            overScrollMode="never"
            {...props}
            contentContainerStyle={[styes.list, props.contentContainerStyle, { minHeight, paddingTop }]}
            ref={(node: any) => scrollViewNodes[id] = node}
            scrollEventThrottle={1}
            refreshControl={
                props.refreshControl ?
                    <RefreshControl
                        {...props.refreshControl?.props}
                        progressViewOffset={(props.refreshControl?.props?.progressViewOffset ?? 0) - contentOffset.value.y + paddingTop}
                    /> :
                    undefined
            }
            onScroll={scrollHandler(id)} />
    );
}

export { List as default }

