import React from "react"
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"

export const AccountCollectionsSkeleton = (props) => (
    <ContentLoader
        speed={2}
        width={450}
        height={150}
        viewBox="0 0 450 150"
        backgroundColor="#c9c5c5"
        foregroundColor="#ffffff"
        {...props}
    >
        <Rect x="7" y="11" rx="8" ry="8" width="369" height="125" />
    </ContentLoader>
)

