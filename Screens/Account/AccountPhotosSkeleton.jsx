import React from "react"
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"

export const AccountPhotosSkeleton = (props) => (
    <ContentLoader
        speed={2}
        width={400}
        height={350}
        viewBox="0 0 400 350"
        backgroundColor="#c9c5c5"
        foregroundColor="#ffffff"
        {...props}
    >
        <Rect x="-1" y="2" rx="0" ry="0" width="396" height="356" />
    </ContentLoader>
)

