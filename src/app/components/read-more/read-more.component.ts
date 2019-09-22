import {
  Component,
  Input,
  ElementRef,
  AfterViewInit,
  HostListener,
  ChangeDetectorRef
} from "@angular/core";

@Component({
  selector: "[read-more]",
  templateUrl: "./read-more.component.html",
  styleUrls: ["./read-more.component.scss"]
})
export class ReadMoreComponent implements AfterViewInit {
  @Input() maxHeightObj: { lg?: number; md?: number; sm?: number };
  private maxHeight: number;
  private isCollapsed: boolean = false;
  private isCollapsable: boolean = false;
  private innerWidth: any;

  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {}

  @HostListener("window:resize") onResize() {
    this.collapse();
  }
  ngAfterViewInit() {
    this.collapse();
  }
  private collapse(): void {
    const currentHeight = this.elementRef.nativeElement.getElementsByTagName(
      "div"
    )[0].offsetHeight;
    this.calculateHeight();
    if (currentHeight > this.maxHeight) {
      this.isCollapsed = true;
      this.isCollapsable = true;
    }
    this.cdr.detectChanges();
  }
  private calculateHeight(): number | void {
    const width = window.innerWidth;
    const obj = this.maxHeightObj;

    if (!obj || !obj.lg)
      return (this.maxHeight = this.calculateLineHeight(
        this.elementRef.nativeElement
      ));
    else if (width > 768) this.maxHeight = obj.sm || obj.md || obj.lg;
    else if (width > 992) this.maxHeight = obj.md || obj.lg;
    if (width > 1200) this.maxHeight = obj.lg;
  }
  private calculateLineHeight(element: HTMLElement): number {
    let lineHeight: number = parseInt(
      this.elementRef.nativeElement.style["line-height"],
      10
    );
    let singleLineHeight: number;
    let doubleLineHeight: number;
    let clone;

    if (isNaN(lineHeight)) {
      clone = element.cloneNode();
      clone.innerHTML = "<br>";
      element.appendChild(clone);
      singleLineHeight = clone.offsetHeight;
      clone.innerHTML = "<br><br>";
      doubleLineHeight = clone.offsetHeight;
      element.removeChild(clone);
      lineHeight = doubleLineHeight - singleLineHeight;
    }
    return lineHeight;
  }
}