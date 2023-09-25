// import React, { useState, useEffect } from 'react';
// import { useWindowSize } from 'usehooks-ts'
// // import './style.css';

// interface ResizableProps {
//     direction: 'horizontal' | 'vertical',
//     children: React.ReactNode
// }

// const ResizableBox: React.FC<ResizableProps> = ({ direction, children }) => {
//     const { width: wds, height: hds } = useWindowSize()

//     let resizableProps: ResizableBoxProps;
//     const [innerHeight, setInnerHeight] = useState(0);
//     const [innerWidth, setInnerWidth] = useState(0);
//     const [width, setWidth] = useState(wds*0.75);

//     useEffect(() => {
//         setInnerHeight(hds);
//         setInnerWidth(wds);
//         setWidth(wds * 0.75);
//         console.log(wds, hds, wds*0.75)
//     }, [wds, hds]);

//     useEffect(() => {
//         let timer: any;
//         const listener = () => {
//             if (timer) {
//                 clearTimeout(timer);
//             }
//             timer = setTimeout(() => {
//                 setInnerHeight(hds);
//                 setInnerWidth(wds);
//                 setWidth(wds * 0.75);
//                 if (wds * 0.75 < width) {
//                 }
//             }, 100);
//         };

        
//         window.addEventListener('resize', listener);

//         return () => {
//             window.removeEventListener('resize', listener);
//         };
//     }, [width]);

//     if (direction === 'horizontal') {
//         resizableProps = {
//             className: 'resize-horizontal',
//             minConstraints: [innerWidth * 0.2, Infinity],
//             maxConstraints: [innerWidth * 0.75, Infinity],
//             height: Infinity,
//             width,
//             resizeHandles: ['e'],
//             onResizeStop: (event, data) => {
//                 setWidth(data.size.width);
//             },
//         };
//     } else {
//         resizableProps = {
//             minConstraints: [Infinity, 24],
//             maxConstraints: [Infinity, innerHeight * 0.9],
//             height: 300,
//             width: Infinity,
//             resizeHandles: ['s'],
//         };
//     }

//     console.log(resizableProps)
//     return (
//         <ResizableWrapper
//             {...resizableProps}

//         >
//             {children}
//         </ResizableWrapper >
//     )
// }
// // const ResizableBox: React.FC<ResizableProps> = ({ direction, children }) => {
// //     const { width, height } = useWindowSize()
// //     const [stateWidth, setWidth] = useState(400);

// //     const onResize = (event, { size }) => {
// //         setWidth(size.width);
// //     };
// //     let resizebleProps

// //     if (direction === 'horizontal') {
// //         resizebleProps = {
// //             height: Infinity,
// //             width: width * 0.75,
// //             className: 'firstPanel',
// //             resizeHandles: ['e'],
// //             minConstraints: [100, 100],
// //             // maxConstraints: [height * 0.75, Infinity],
// //             // width: Infinity,
// //             // height: 200,
// //             // onResize: onResize
// //         }
// //     } else if (direction === 'vertical') {
// //         resizebleProps = {
// //             className: 'secondPanel',
// //             height: 400,
// //             width: Infinity,
// //             resizeHandles: ['s'],
// //             minConstraints: [Infinity, 200],
// //             maxConstraints: [Infinity, height * 0.9],
// //         }
// //     }
// //     else {
// //         //   resizebleProps = {
// //         //     className: 'lastPanel',
// //         //     height: Infinity,
// //         //     width: Infinity,

// //         //   }
// //     }

// //     console.log(resizebleProps)
// //     return (
// //         <Resizable
// //             {...resizebleProps}
// //             style={{
// //                 width: '100%'
// //             }}
// //         >
// //             {children}
// //         </Resizable >
// //     )
// // }

// export default ResizableBox
