import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.less"],
})
export class LayoutComponent implements OnInit {
  public title = "Angular RxJS";
  public isCollapsed = false;
  public menus: IMenu[] = [
    {
      title: "Home",
      icon: "home",
      link: "/home",
    },
    {
      title: "Observable",
      icon: "interaction",
      link: "/observable",
      isOpen: false,
      children: [
        {
          title: "Observable",
          link: "/example",
        },
        {
          title: "Observable vs Promise",
          link: "/observable-vs-promise",
        },
      ],
    },
    {
      title: "Operators",
      icon: "appstore",
      link: "/operators",
      isOpen: false,
      children: [
        {
          title: "Category",
          link: "/category",
        },
        {
          title: "Creation",
          link: "/creation",
        },
        {
          title: "Combination",
          link: "/combination",
        },
        {
          title: "Filtering",
          link: "/filtering",
        },
        {
          title: "Transformation",
          link: "/transformation",
        },
        {
          title: "Utility",
          link: "/utility",
        },
      ],
    },
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    // this.getRouteInfo();
  }

  public getRouteInfo() {
    const { url } = this.router;
    console.log(this.hasActivatedRoute(this.menus, url));
  }

  public hasActivatedRoute(menus: IMenu[], url: string) {
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i];
      if (!menu.children) {
        console.log(`url`, url)
        console.log(`menu.link`, menu.link)
        return url.includes(menu.link);
      } else {
        this.hasActivatedRoute(menu.children, url);
      }
    }
  }

  public handleMenuChange(currentTitle: string): void {
    for (let i = 0; i < this.menus.length; i++) {
      this.menus[i].isOpen =
        this.menus[i].title === currentTitle ? true : false;
    }
  }
}

interface IMenu {
  title: string;
  icon?: string;
  link?: string;
  isOpen?: boolean;
  children?: IMenu[];
}
