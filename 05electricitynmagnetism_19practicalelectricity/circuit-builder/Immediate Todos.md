# Scope:

So student version has no left panel, cannot edit component attributes like resistance or battery voltage (unless that's enabled by the teacher, either globally or per component), can't move components around, and can't edit wires. However, they can zoom and move the camera, only to view a fixed size area around all the components. In addition, the student version can read the inline ammeter, put the probes of the voltmeter on specified locations, and read the voltmeter.

Teacher version has the ability to do all of those, plus export a frozen student version. It must be able to use a checkbox to set whether a component should be configurable by the student. It must be able to paint locations where the voltmeter can probe the circuit. It must be able to globally set whether the student version can edit all components. It should have the ability to test what the student version would be like.

# Todos:

- Add labels
- Highlight components or connection points
- Add visual lines between components and/or connection points (for indicating labels)
- In regards to mouse events: delegate decision-making to separate objects to fulfill single-responsibility principle

