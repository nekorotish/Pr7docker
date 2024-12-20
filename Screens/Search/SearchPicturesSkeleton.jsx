import React from "react"
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"

export const SearchPicturesSkeleton = (props) => (
    <ContentLoader
        speed={2}
        width={442}
        height={400}
        viewBox="0 0 420 400"
        backgroundColor="#c9c5c5"
        foregroundColor="#ffffff"
        {...props}
    >
        <Rect x="-1" y="9" rx="0" ry="0" width="194" height="183" />
        <Rect x="201" y="8" rx="0" ry="0" width="170" height="257" />
        <Rect x="0" y="198" rx="0" ry="0" width="193" height="212" />
        <Rect x="201" y="272" rx="0" ry="0" width="170" height="130" />
    </ContentLoader>
)

