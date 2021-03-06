it.todo("to be integrated");
// import "@testing-library/jest-dom";
// import { fireEvent, getByTestId, queryByAttribute } from "@testing-library/dom";
// import { cls, dom, EventsHandler } from "../infra";

// import { folder, deepCopy, createItemsFromArray, video } from "./testUtils";
// import { renderTreeView } from ".";
// import * as domain from "../domain";

// jest.mock("../infra/browser/animations", () => ({
//   animate: () => ({
//     addEventListener: (event: string, cb: EmptyFunc) => cb(),
//   }),
//   expandHeight: () => ({
//     addEventListener: (event: string, cb: EmptyFunc) => cb(),
//   }),
//   collapseHeight: () => ({
//     addEventListener: (event: string, cb: EmptyFunc) => cb(),
//   }),
//   revertCurrentAnimations: () => false,
// }));

// const folder1_1_2_1 = folder("folder1_1_2_1");
// const folder1_1_1 = folder("folder1_1_1");
// const folder1_1_2 = folder("folder1_1_2", [folder1_1_2_1.id]);
// const folder1_1 = folder("folder1_1", [folder1_1_1.id, folder1_1_2.id]);
// const folder1_2 = folder("folder1_2");
// const video1_3 = video("video1_3", "youtube1_2");
// const folder1 = folder("folder1", [folder1_1.id, folder1_2.id, video1_3.id]);
// const folder2 = folder("folder2");
// const home = folder("HOME", [folder1.id, folder2.id]);
// const createTestItems = () =>
//   deepCopy(
//     createItemsFromArray([
//       home,
//       folder1,
//       folder1_1,
//       folder1_1_1,
//       folder1_1_2,
//       folder1_1_2_1,
//       folder1_2,
//       video1_3,
//       folder2,
//     ])
//   );

// //HOME
// // folder1 (closed by default)
// //   folder1_1
// //     folder1_1_1
// //     folder1_1_2
// //       folder1_1_2_1
// //   folder1_2
// //   video1_3
// // folder2

// describe("App features:", () => {
//   let events: EventsHandler<MyEvents>;

//   beforeEach(() => {
//     events = new EventsHandler<MyEvents>();
//     domain.init(events);
//     domain.items.itemsLoaded(createTestItems());
//     dom.setChildren(document.body, renderTreeView());
//   });

//   describe("OPEN/CLOSE", () => {
//     it("folder1 and folder2 should be closed", () => {
//       expect(chevron(folder1)).not.toHaveClass(cls.chevronOpen);
//       expect(chevron(folder2)).not.toHaveClass(cls.chevronOpen);
//     });

//     it("folder1 is non-empty so outer circle should be shown and empty circle is hidden", () => {
//       expect(outerCircle(folder1)).toHaveStyle("opacity: 1");
//       expect(emptyCircle(folder1)).toHaveStyle("opacity: 0");
//     });

//     it("folder2 is empty so outer and inner circles are hidden and empty circle is visible", () => {
//       expect(outerCircle(folder2)).toHaveStyle("opacity: 0");
//       expect(innerCircle(folder2)).toHaveStyle("opacity: 0");
//       expect(emptyCircle(folder2)).toHaveStyle("opacity: 1");
//     });

//     describe("expanding folder1", () => {
//       beforeEach(() => clickChevron(folder1));

//       it("should show its children", () => {
//         expect(getRow(folder1_1)).toBeInTheDocument();
//       });

//       it("update chevron", () => {
//         expect(chevron(folder1)).toHaveClass(cls.chevronOpen);
//       });

//       it("hide outer circle", () => {
//         expect(outerCircle(folder1)).toHaveStyle("opacity: 0");
//       });

//       describe("then collapsing folder1", () => {
//         beforeEach(() => clickChevron(folder1));

//         it("should hide its children", () => {
//           expect(queryRow(folder1_1)).not.toBeInTheDocument();
//         });

//         it("update chevron", () => {
//           expect(chevron(folder1)).not.toHaveClass(cls.chevronOpen);
//         });
//         it("show outer circle", () => {
//           expect(outerCircle(folder1)).toHaveStyle("opacity: 1");
//         });
//         it("should remove child from event listers", () => {
//           expect(events.events["item-collapse"][folder1_1.id]).toBeUndefined();
//         });

//         it("clearing body should cleanup all event listeners", () => {
//           dom.removeAllChildren(document.body);
//           expect(JSON.stringify(events.events)).toBe("{}");
//         });
//       });
//     });
//   });

//   describe("FOCUS", () => {
//     it("by default home is shown as page title", () => {
//       expect(getPageTitle()).toHaveTextContent(home.title);
//     });
//     describe("focusing on folder1", () => {
//       beforeEach(() => focusRow(folder1));

//       it("shows folder1 title on a page", () => {
//         expect(getPageTitle()).toHaveTextContent(folder1.title);
//       });

//       it("shows folder1_1 and folder 1_2 title on a page", () => {
//         expect(getRow(folder1_1)).toBeInTheDocument();
//         expect(getRow(folder1_2)).toBeInTheDocument();
//       });

//       it("hides folder2", () => {
//         expect(queryRow(folder2)).not.toBeInTheDocument();
//       });

//       it("going back should focus on Home again", () => {
//         press.arrowLeft({ alt: true });
//         expect(getPageTitle().textContent).toBe(home.title);
//       });
//     });

//     describe("when folder1_1 is focused", () => {
//       beforeEach(() => {
//         clickChevron(folder1);
//         focusRow(folder1_1);
//       });

//       it("folder1_1 title should be on the screen", () => {
//         expect(getPageTitle()).toHaveTextContent(folder1_1.title);
//       });

//       it("pressing alt + <- focuses on parent (folder1)", () => {
//         press.arrowLeft({ alt: true });
//         expect(getPageTitle()).toHaveTextContent(folder1.title);
//       });

//       describe("selecting folder1_1_2", () => {
//         beforeEach(() => clickRow(folder1_1_2));

//         describe("pressing alt + ->", () => {
//           beforeEach(() => press.arrowRight({ alt: true }));
//           it("focuses it", () => {
//             expect(getPageTitle()).toHaveTextContent(folder1_1_2.title);
//           });
//           it("selects first child", () => {
//             expect(getRow(folder1_1_2_1)).toHaveClass(cls.rowSelected);
//           });
//         });

//         it("pressing down should still select folder1_1_2 (because it's the last in list and not open)", () => {
//           expect(getRow(folder1_1_2)).toHaveClass(cls.rowSelected);
//           press.arrowDown();
//           expect(getRow(folder1_1_2)).toHaveClass(cls.rowSelected);
//         });
//       });
//     });
//   });

//   describe("SELECTION via mouse", () => {
//     describe("Clicking on a folder2", () => {
//       beforeEach(() => {
//         clickRow(folder2);
//       });
//       it("should focus folder2", () => {
//         expect(getRow(folder2)).toHaveClass(cls.rowSelected);
//       });

//       describe("clicking on a folder1", () => {
//         beforeEach(() => clickRow(folder1));
//         it("should select folder1", () => {
//           expect(getRow(folder1)).toHaveClass(cls.rowSelected);
//         });
//         it("should unselect folder2", () => {
//           expect(getRow(folder2)).not.toHaveClass(cls.rowSelected);
//         });
//       });
//     });
//   });

//   describe("TRAVERSAL via keyboard", () => {
//     describe("By default when nothing is selected and user presses down", () => {
//       beforeEach(() => press.arrowDown());
//       it("first node in focus should be selected (folder1)", () => {
//         expect(getRow(folder1)).toHaveClass(cls.rowSelected);
//       });
//       describe("pressing right", () => {
//         beforeEach(() => press.arrowRight());
//         it("should expand folder1", () => {
//           expect(getRow(folder1_1)).toBeInTheDocument();
//           expect(getRow(folder1_1)).not.toHaveClass(cls.rowSelected);
//         });
//         it("pressing right again should select first child (folder1_1)", () => {
//           press.arrowRight();
//           expect(getRow(folder1_1)).toHaveClass(cls.rowSelected);
//         });
//         describe("pressing down", () => {
//           beforeEach(() => press.arrowDown());
//           it("selects first child (folder1_1)", () => {
//             expect(getRow(folder1_1)).toHaveClass(cls.rowSelected);
//           });
//           describe("pressing up", () => {
//             beforeEach(() => press.arrowUp());
//             it("should select parent node (folder1)", () => {
//               expect(getRow(folder1)).toHaveClass(cls.rowSelected);
//             });
//             it("pressing up again should still select folder1 (focus node is not selected)", () => {
//               press.arrowUp();
//               expect(getRow(folder1)).toHaveClass(cls.rowSelected);
//             });
//           });
//           describe("pressing right", () => {
//             beforeEach(() => press.arrowRight());
//             it("expands content and then pressing left closes them", () => {
//               expect(getRow(folder1_1_1)).toBeInTheDocument();
//             });
//             describe("pressing left", () => {
//               beforeEach(() => press.arrowLeft());
//               it("closes that node", () => {
//                 expect(queryRow(folder1_1_1)).not.toBeInTheDocument();
//               });
//               describe("pressing left", () => {
//                 beforeEach(() => press.arrowLeft());
//                 it("selects parent that node (folder1)", () => {
//                   expect(getRow(folder1)).toHaveClass(cls.rowSelected);
//                 });
//               });
//             });
//           });
//         });
//       });
//       describe("pressing down", () => {
//         beforeEach(() => press.arrowDown());
//         it("should select folder2 and unselect folder1", () => {
//           expect(getRow(folder2)).toHaveClass(cls.rowSelected);
//           expect(getRow(folder1)).not.toHaveClass(cls.rowSelected);
//         });
//         describe("pressing up", () => {
//           beforeEach(() => press.arrowUp());
//           it("should select folder1 and unselect folder2", () => {
//             expect(getRow(folder1)).toHaveClass(cls.rowSelected);
//             expect(getRow(folder2)).not.toHaveClass(cls.rowSelected);
//           });
//         });
//       });
//     });
//     describe("when every folder is open", () => {
//       beforeEach(() => {
//         clickChevron(folder1);
//         clickChevron(folder1_1);
//         clickChevron(folder1_1_2);
//       });
//       it("when folder1_1_2_1 is selected pressing down should select folder1_2", () => {
//         clickRow(folder1_1_2_1);
//         expect(getRow(folder1_1_2_1)).toHaveClass(cls.rowSelected);
//         press.arrowDown();
//         expect(getRow(folder1_2)).toHaveClass(cls.rowSelected);
//       });
//       it("when folder1_2 is selected pressing up should select folder1_1_2_1", () => {
//         clickRow(folder1_2);
//         expect(getRow(folder1_2)).toHaveClass(cls.rowSelected);
//         press.arrowUp();
//         expect(getRow(folder1_1_2_1)).toHaveClass(cls.rowSelected);
//       });
//     });
//   });

//   describe("DND via mouse", () => {
//     const startDraggingItem = (item: Item) => {
//       fireEvent.mouseDown(outerCircle(item), {
//         clientX: 0,
//         clientY: 0,
//       });
//       fireEvent.mouseMove(document, {
//         buttons: 1,
//         clientX: 5,
//         clientY: 5,
//       });
//     };
//     it("moving folder1 after folder2 and droping should swap their positions", () => {
//       const getTitlesInOrder = () =>
//         Array.from(document.getElementsByClassName(cls.treeRow)).map(
//           (row) => row.getElementsByClassName(cls.rowText)[0].textContent
//         );

//       expect(getTitlesInOrder()).toEqual([folder1.title, folder2.title]);

//       startDraggingItem(folder1);
//       const rowHeight = 20;
//       const folder2XPosition = 110;

//       const row = getRow(folder2);
//       row.getBoundingClientRect = () =>
//         ({
//           height: rowHeight,
//           top: folder2XPosition,
//         } as any);

//       fireEvent.mouseMove(getRow(folder2), {
//         buttons: 1,
//         clientX: 10,
//         clientY: folder2XPosition + rowHeight / 2 + 1,
//       });

//       fireEvent.mouseUp(document);
//       expect(getTitlesInOrder()).toEqual([folder2.title, folder1.title]);
//     });
//     it("moving folder2 before folder1 and droping should swap their positions", () => {
//       const getTitlesInOrder = () =>
//         Array.from(document.getElementsByClassName(cls.treeRow)).map(
//           (row) => row.getElementsByClassName(cls.rowText)[0].textContent
//         );

//       expect(getTitlesInOrder()).toEqual([folder1.title, folder2.title]);

//       startDraggingItem(folder2);
//       const rowHeight = 20;
//       const folder1Position = 110;

//       const row = getRow(folder1);
//       row.getBoundingClientRect = () =>
//         ({
//           height: rowHeight,
//           top: folder1Position,
//         } as any);

//       fireEvent.mouseMove(getRow(folder1), {
//         buttons: 1,
//         clientX: 10,
//         clientY: folder1Position + rowHeight / 2 - 1,
//       });

//       fireEvent.mouseUp(document);
//       expect(getTitlesInOrder()).toEqual([folder2.title, folder1.title]);
//     });

//     it("opening folder1 and draggning folder2 inside should place folder2 as first child", () => {
//       const getTitlesInChildren = (item: Item) =>
//         Array.from(
//           get("item-children-" + item.id).getElementsByClassName(cls.treeRow)
//         ).map((row) => row.getElementsByClassName(cls.rowText)[0].textContent);

//       const folder2OuterCircle = itemIcon(folder1);
//       folder2OuterCircle.getBoundingClientRect = () => ({ left: 10 } as any);

//       clickChevron(folder1);
//       expect(getTitlesInChildren(folder1)).toEqual([
//         folder1_1.title,
//         folder1_2.title,
//         video1_3.title,
//       ]);

//       startDraggingItem(folder2);
//       const rowHeight = 20;
//       const folder1Position = 110;

//       const row = getRow(folder1);
//       row.getBoundingClientRect = () =>
//         ({
//           height: rowHeight,
//           top: folder1Position,
//         } as any);

//       fireEvent.mouseMove(getRow(folder1), {
//         buttons: 1,
//         clientX: 60,
//         clientY: folder1Position + rowHeight / 2 + 1,
//       });

//       fireEvent.mouseUp(document);
//       expect(getTitlesInChildren(folder1)).toEqual([
//         folder2.title,
//         folder1_1.title,
//         folder1_2.title,
//         video1_3.title,
//       ]);
//     });
//   });

//   describe("RENAME", () => {
//     describe("pressing F2 while folder1 is selected", () => {
//       beforeEach(() => {
//         clickRow(folder1);
//         fireEvent.keyDown(document, { key: "F2" });
//       });
//       it("shows input with focus on it", () => {
//         expect(itemInput(folder1)).toBeInTheDocument();
//         expect(document.activeElement).toBe(itemInput(folder1));
//       });

//       describe("entering new title", () => {
//         const newTitle = "New Title";
//         beforeEach(() =>
//           fireEvent.input(itemInput(folder1), {
//             target: { value: newTitle },
//           })
//         );
//         it("pressing ESC should exit rename with new item title", () => {
//           const input = itemInput(folder1);
//           expect(domain.items.getItem(folder1.id).title).toBe(newTitle);

//           fireEvent.keyDown(input, { key: "Escape" });
//           expect(input).not.toBeInTheDocument();

//           expect(itemTitle(folder1).textContent).toBe(newTitle);
//         });

//         it("bluring input element should also exist edit mode", () => {
//           fireEvent.blur(itemInput(folder1));
//           expect(itemTitle(folder1).textContent).toBe(newTitle);
//         });
//       });
//     });
//   });

//   describe("PLAYER", () => {
//     it("opening folder1 and clicking play on a video1_3 should show pause icon", () => {
//       const [leftPause, rightPause] = pauseIcons(folder1);
//       const folderr1PlayIcon = playIcon(folder1);
//       expect(leftPause).toHaveStyle("opacity: 0");
//       expect(rightPause).toHaveStyle("opacity: 0");
//       expect(folderr1PlayIcon).toHaveStyle("opacity: 0");
//       clickFolderIcon(folder1);
//       expect(leftPause).toHaveStyle("opacity: 1");
//       expect(rightPause).toHaveStyle("opacity: 1");
//       expect(folderr1PlayIcon).toHaveStyle("opacity: 0");
//     });
//   });
// });

// //
// //
// //ACTIONS
// const focusRow = (item: Item) =>
//   fireEvent.click(itemIcon(item), {
//     ctrlKey: true,
//   });

// const clickChevron = (item: Item) => fireEvent.click(chevron(item));
// const clickBack = () => fireEvent.click(get("go-back"));
// const clickFolderIcon = (item: Item) => fireEvent.click(itemIcon(item));
// const clickRow = (item: Item) => fireEvent.click(getById("row-" + item.id));

// //
// //
// //Queries
// const getPageTitle = () => get("page-title");
// const getCounter = () => get("increment-button");
// const chevron = (item: Item) => get("chevron-" + item.id);
// const outerCircle = (item: Item) => itemIcon(item).children[0];
// const innerCircle = (item: Item) => itemIcon(item).children[1];
// const emptyCircle = (item: Item) => itemIcon(item).children[2];
// const playIcon = (item: Item) => itemIcon(item).children[3];
// const pauseIcons = (item: Item) => [
//   itemIcon(item).children[4],
//   itemIcon(item).children[5],
// ];

// const itemIcon = (item: Item) => get("itemIcon-" + item.id);
// const itemTitle = (item: Item) =>
//   getRow(item).getElementsByClassName(cls.rowText)[0];
// const itemInput = (item: Item) =>
//   getRow(item).getElementsByClassName(cls.rowTextInput)[0] as HTMLElement;
// const getRow = (item: Item): Element => getById("row-" + item.id) as Element;
// const queryRow = (item: Item) => queryById("row-" + item.id);

// //general page-agnostic query helpers

// const get = (id: string) => getByTestId(document.body, id);
// const queryById = (id: string) => queryByAttribute("id", document.body, id);
// const getById = (id: string): Node => {
//   const res = queryByAttribute("id", document.body, id);
//   if (!res) throw new Error("No element with id: " + id);

//   return res;
// };

// interface Modifiers {
//   alt?: boolean;
// }
// const press = {
//   arrowDown: (modifiers?: Modifiers) =>
//     fireEvent.keyDown(document.body, {
//       key: "ArrowDown",
//       altKey: modifiers?.alt,
//     }),
//   arrowUp: (modifiers?: Modifiers) =>
//     fireEvent.keyDown(document.body, {
//       key: "ArrowUp",
//       altKey: modifiers?.alt,
//     }),
//   arrowRight: (modifiers?: Modifiers) =>
//     fireEvent.keyDown(document.body, {
//       key: "ArrowRight",
//       altKey: modifiers?.alt,
//     }),
//   arrowLeft: (modifiers?: Modifiers) =>
//     fireEvent.keyDown(document.body, {
//       key: "ArrowLeft",
//       altKey: modifiers?.alt,
//     }),
// };
