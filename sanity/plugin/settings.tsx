/**
 * This plugin contains all the logic for setting up the singletons
 */
import type { DocumentDefinition } from "sanity";
import type { StructureResolver } from "sanity/structure";

export function singletonPlugin(types: string[]) {
  return {
    name: "singletonPlugin",
    document: {
      // Hide 'Singletons (such as Home)' from new document options
      // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
      newDocumentOptions: (prev, { creationContext }) => {
        if (creationContext.type === "global") {
          return prev.filter(
            templateItem => !types.includes(templateItem.templateId),
          );
        }

        return prev;
      },
      // Removes the "duplicate" action on the Singletons (such as Home)
      actions: (prev, { schemaType }) => {
        if (types.includes(schemaType)) {
          return prev.filter(({ action }) => action !== "duplicate");
        }

        return prev;
      },
    },
  };
}

// The StructureResolver is how we're changing the DeskTool structure to linking to document (named Singleton)
// like how "Home" is handled.
export function pageStructure(typeDefArray: DocumentDefinition[]): StructureResolver {
  return (S) => {
    // Goes through all of the singletons that were provided and translates them into something the
    // Desktool can understand
    const singletonItems = typeDefArray.map((typeDef) => {
      return S.listItem()
        .title(typeDef.title!)
        .id(typeDef.name)
        .icon(typeDef.icon)
        .child(
          S.editor()
            .id(typeDef.name)
            .schemaType(typeDef.name)
            .documentId(typeDef.name),
        );
    });

    // Custom article list with updated date
    const articleListItem = S.listItem()
      .title("Articles")
      .id("article")
      .child(
        S.documentList()
          .title("Articles")
          .filter("_type == \"article\"")
          .defaultOrdering([{ field: "updateddate", direction: "desc" }])
          .child(documentId =>
            S.document()
              .documentId(documentId)
              .schemaType("article"),
          ),
      );

    // The default root list items (except custom ones)
    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) => {
        const id = listItem.getId();
        return !typeDefArray.find(singleton => singleton.name === id) && id !== "article";
      },
    );

    return S.list()
      .title("Content")
      .items([...singletonItems, S.divider(), articleListItem, ...defaultListItems]);
  };
}
