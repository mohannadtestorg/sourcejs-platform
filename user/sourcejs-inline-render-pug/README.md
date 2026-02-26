# pb.render()

[SourceJS](http://sourcejs.com) plugin.

## Install

To install the middleware, run npm command in `~/apps64/sourcePlatform/user` folder:

```
npm install sourcejs-inline-render-pug --save
```

After restarting your app, the middleware will be loaded automatically. To disable it, remove npm module and restart the app.

## Use cases


### pb.render(componentName)

This will render the component/widget's template as it is.

#### Example

```
pb.render("figure-viewer")
```

Will render `/specs/ux3/components/figure-viewer/templates/figure-viewer/figure-viewer-tmpl.jade` template.


### pb.render(componentName, templateName)

This will render the component/widget's alternative template as it is.

#### Example

```
pb.render("figure-viewer", "figure-viewer/extended/ext-figure-viewer")
```

Will render `/specs/ux3/components/figure-viewer/templates/figure-viewer/extended/ext-figure-viewer-tmpl.jade` template.


### pb.render(componentName, productName)

This will render the component/widget's template for the specified product as it is.

#### Example

```
pb.render("figure-viewer", "pericles")
```

Will render `/specs/products/pericles/components/figure-viewer/templates/figure-viewer/figure-viewer-tmpl.jade` template.


### pb.render(componentName, data)

This will render the component/widget's template with the specified data.

#### Example

```
pb.render("parent-item", {"data": {"serial": {"title": "Journal of Computing in Civil Engineering", "journalLink": "/action/showJournal?doi=10.1061%2Fjccee5", "code": "jccee5"}, "volume": 2, "issue": 5}})
```

Will render `/specs/ux3/components/parent-item/templates/parent-item/parent-item-tmpl.jade` template with the specified data object.


### pb.render(componentName, dataFileName)

This will render the component/widget's template with the data from the specified JSON file.

#### Example

```
pb.render("parent-item", "parent-item.json")
```

Will render `/specs/ux3/components/parent-item/templates/parent-item/parent-item-tmpl.jade` template with the data from `/specs/ux3/components/parent-item/templates/data/parent-item.json`.


### pb.render(componentName, templateName, data)

This will render the component/widget's alternative template with the specified data.

#### Example

```
pb.render("list-of-issues", "list-of-issues/demo/list-of-issues-demo", {"data": {"widget": {"template": "default"}, "nav": {...}, "loi": {...}}})
```

Will render `/specs/ux3/widgets/list-of-issues/templates/list-of-issues/demo/list-of-issues-demo-tmpl.jade` template with the specified data object.


### pb.render(componentName, templateName, dataFileName)

This will render the component/widget's alternative template with the data from the specified JSON file.

#### Example

```
pb.render("list-of-issues", "list-of-issues/demo/list-of-issues-demo", "loi-data.json")
```

Will render `/specs/ux3/widgets/list-of-issues/templates/list-of-issues/demo/list-of-issues-demo-tmpl.jade` template with the data from `/specs/ux3/widgets/list-of-issues/templates/data/loi-data.json`.


### pb.render(componentName, templateName, productName)

This will render the component/widget's alternative template for the specified product as it is.

#### Example

```
pb.render("figure-viewer", "figure-viewer/extended/ext-figure-viewer", "pericles")
```

Will render `/specs/products/pericles/components/figure-viewer/templates/figure-viewer/extended/ext-figure-viewer-tmpl.jade` template.


### pb.render(componentName, data, productName)

This will render the component/widget's template for the specified product with the specified data.

#### Example

```
pb.render("list-of-issues", {"data": {"widget": {"template": "default"}, "nav": {...}, "loi": {...}}}, "pericles")
```

Will render `/specs/products/pericles/widgets/list-of-issues/templates/list-of-issues/list-of-issues-tmpl.jade` template with the specified data object.


### pb.render(componentName, dataFileName, productName)

This will render the component/widget's template for the specified product with the data from the specified JSON file.

#### Example

```
pb.render("list-of-issues", "loi-data.json", "pericles")
```

Will render `/specs/products/pericles/widgets/list-of-issues/templates/list-of-issues/list-of-issues-tmpl.jade` template with the data from `/specs/products/pericles/widgets/list-of-issues/templates/data/loi-data.json`. If the custom JSON file doesn't exist, it will load the data from `/specs/ux3/widgets/list-of-issues/templates/data/loi-data.json`.


### pb.render(componentName, templateName, data, productName)

This will render the component/widget's alternative template for the specified product with the specified data.

#### Example

```
pb.render("list-of-issues", "list-of-issues/demo/list-of-issues-demo", {"data": {"widget": {"template": "default"}, "nav": {...}, "loi": {...}}}, "pericles")
```

Will render `/specs/products/pericles/widgets/list-of-issues/templates/list-of-issues/demo/list-of-issues-demo-tmpl.jade` template with the specified data object.


### pb.render(componentName, templateName, dataFileName, productName)

This will render the component/widget's alternative template for the specified product with the data from the specified JSON file.

#### Example

```
pb.render("list-of-issues", "list-of-issues/demo/list-of-issues-demo", "loi-data.json", "pericles")
```

Will render `/specs/products/pericles/widgets/list-of-issues/templates/list-of-issues/demo/list-of-issues-demo-tmpl.jade` template with the data from `/specs/products/pericles/widgets/list-of-issues/templates/data/loi-data.json`. If the custom JSON file doesn't exist, it will load the data from `/specs/ux3/widgets/list-of-issues/templates/data/loi-data.json`.


### Shared widget

If you want to wrap `shared-widget` around your component/widget, you can provide shared widget configuration object as the last parameter to `pb.render()`. The shared widget configuration object can be added in all the cases listed above.

#### Example

```
pb.render("list-of-issues", "loi-data.json", {"shared": {"model": {"config": {"wrapper": "true", "className": ["my-loi-wrapper"]}}}}))
```

Will render `/specs/ux3/widgets/list-of-issues/templates/list-of-issues/list-of-issues-tmpl.jade` template with the data from `/specs/ux3/widgets/list-of-issues/templates/data/loi-data.json` wrapped in `<div class="my-loi-wrapper">...</div>`.